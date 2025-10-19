import pandas as pd
import numpy as np
import joblib
import json
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional, List
from enum import Enum

# --- 1. Initialize FastAPI App ---
app = FastAPI(
    title="Fasal Sahayak AI API",
    description="API for predicting crop yield in Odisha based on our specialized model.",
    version="1.0.0"
)

# --- 2. Load Production Assets at Startup ---
# This ensures files are loaded only once, not on every request.
try:
    model_general = joblib.load('general_yield_model.pkl')
    model_columns_general = joblib.load('general_model_columns.pkl')

    with open('imputed_data_store.json', 'r') as f:
        imputed_data_store = json.load(f)
    
    with open('soil_type_store.json', 'r') as f:
        soil_type_store = json.load(f)
    
    with open('weather_store.json', 'r') as f:
        weather_store = json.load(f)
        
except FileNotFoundError:
    print("FATAL ERROR: Model asset files not found.")
    # In a real app, this would stop the server from starting.
    model_general = None 
    model_columns_general = []
    imputed_data_store, soil_type_store, weather_store = {}, {}, {}

# --- 3. Define Input/Output Data Models (Pydantic) ---
# This defines the "schema" your frontend team must send.
# We use Enums for validation.

class DistrictEnum(str, Enum):
    anugul = 'anugul'
    balangir = 'balangir'
    baleshwar = 'baleshwar'
    bargarh = 'bargarh'
    bhadrak = 'bhadrak'
    boudh = 'boudh'
    cuttack = 'cuttack'
    deogarh = 'deogarh'
    dhenkanal = 'dhenkanal'
    gajapati = 'gajapati'
    ganjam = 'ganjam'
    jagatsinghapur = 'jagatsinghapur'
    jajapur = 'jajapur'
    jharsuguda = 'jharsuguda'
    kalahandi = 'kalahandi'
    kandhamal = 'kandhamal'
    kendrapara = 'kendrapara'
    kendujhar = 'kendujhar'
    khordha = 'khordha'
    koraput = 'koraput'
    malkangiri = 'malkangiri'
    mayurbhanj = 'mayurbhanj'
    nabarangpur = 'nabarangpur'
    nayagarh = 'nayagarh'
    nuapada = 'nuapada'
    puri = 'puri'
    rayagada = 'rayagada'
    sambalpur = 'sambalpur'
    sonepur = 'sonepur'
    sundargarh = 'sundargarh'

class SeasonEnum(str, Enum):
    winter = 'Winter'
    summer = 'Summer'
    autumn = 'Autumn'
    kharif = 'Kharif'
    rabi = 'Rabi'
    whole_year = 'Whole Year'

class CropEnum(str, Enum):
    # These are the top 20 we used for OHE (excluding Sugarcane)
    rice = 'Rice'
    urad = 'Urad'
    groundnut = 'Groundnut'
    moong = 'Moong(Green Gram)'
    sesamum = 'Sesamum'
    maize = 'Maize'
    ragi = 'Ragi'
    horse_gram = 'Horse-gram'
    potato = 'Potato'
    rapeseed_mustard = 'Rapeseed &Mustard'
    wheat = 'Wheat'
    castor_seed = 'Castor seed'
    dry_chillies = 'Dry chillies'
    arhar_tur = 'Arhar/Tur'
    sweet_potato = 'Sweet potato'
    sunflower = 'Sunflower'
    onion = 'Onion'
    garlic = 'Garlic'
    coriander = 'Coriander'
    other = 'Other Crop' # Our grouping category

class PredictionInput(BaseModel):
    district: DistrictEnum
    crop: CropEnum
    season: SeasonEnum
    year: int = 2025
    area: float = 1.0
    use_shc: bool = False
    n_value: Optional[float] = None
    p_value: Optional[float] = None
    k_value: Optional[float] = None
    ph_value: Optional[float] = None

class PredictionOutput(BaseModel):
    predicted_yield_tonnes_per_hectare: float
    recommendations: List[str]
    model_used: str

# --- 4. Recommendation Engine (Helper Function) ---
def get_recommendations(inputs: PredictionInput, prediction_log1p: float) -> List[str]:
    recommendations = []
    
    # Convert prediction back from log scale
    prediction_yield = np.expm1(prediction_log1p)
    
    # 1. Yield Context
    if prediction_yield < 0.5:
        recommendations.append(f"**Yield Warning:** Predicted yield is very low ({prediction_yield:.2f} t/ha). Immediate action recommended.")
    elif prediction_yield < 1.5:
        recommendations.append(f"**Yield Info:** Predicted yield is nominal ({prediction_yield:.2f} t/ha).")
    else:
        recommendations.append(f"**Yield Info:** Predicted yield is strong ({prediction_yield:.2f} t/ha).")

    # 2. Nutrient Recommendations
    if inputs.use_shc:
        # ADVANCED MODE: Use farmer's actual data
        if inputs.n_value < 100: # Example threshold
            recommendations.append(f"**Nitrogen (N):** Your SHC value ({inputs.n_value} kg/ha) is low. Consider applying Nitrogen-rich fertilizer.")
        if inputs.ph_value < 5.5:
            recommendations.append(f"**pH:** Your soil is acidic ({inputs.ph_value}). Consider applying lime for better nutrient uptake.")
    else:
        # BASIC MODE: Generic advice based on district soil type
        soil_features = soil_type_store.get(inputs.district.value, soil_type_store['default'])
        if soil_features.get('soil_red', 0) == 1:
            recommendations.append("**Fertilizer (Basic):** You are in a Red Soil area, often low in phosphate. Consider phosphate-based fertilizers.")
        elif soil_features.get('soil_laterite', 0) == 1:
            recommendations.append("**Fertilizer (Basic):** You are in a Laterite Soil area, which can be acidic. Consider testing soil pH.")

    # 3. Weather/Irrigation (Placeholder)
    recommendations.append("**Irrigation:** Check the 5-day weather forecast. Water deeply if no significant rain is expected.")
    
    return recommendations

# --- 5. Prediction Endpoint ---
@app.post("/predict", response_model=PredictionOutput)
async def predict_yield(inputs: PredictionInput):
    
    # --- A. Select Model and Columns ---
    model_to_use = model_general
    model_cols = model_columns_general
    model_name = "General Seasonal Crop Model"
    
    # --- B. Create the Feature Vector ---
    prediction_df = pd.DataFrame(columns=model_cols)
    prediction_df.loc[0] = 0 # Initialize all features to 0
    
    # 1. Set simple features
    prediction_df['year'] = inputs.year
    prediction_df['area'] = inputs.area
    
    # 2. Set OHE District
    dist_col = f"district_{inputs.district.value}"
    if dist_col in prediction_df.columns:
        prediction_df[dist_col] = 1
        
    # 3. Set OHE Season
    season_col = f"season_{inputs.season.value}"
    if season_col in prediction_df.columns:
        prediction_df[season_col] = 1
    
    # 4. Set OHE Crop
    crop_name_key = inputs.crop.value
    crop_col_name = 'crop_' + crop_name_key.lower().replace('(', '').replace(')', '').replace('/', '_').replace(' ', '_').replace('&','and')
    
    if crop_name_key == 'Other Crop' or crop_col_name not in prediction_df.columns:
        prediction_df['crop_other'] = 1
    else:
        prediction_df[crop_col_name] = 1
    
    # 5. Set Soil Type Features (Lookup)
    soil_features = soil_type_store.get(inputs.district.value, soil_type_store['default'])
    for col, val in soil_features.items():
        if col in prediction_df.columns:
            prediction_df[col] = val
            
    # 6. Set Weather Features (Lookup)
    weather_key = f"{inputs.district.value}_{inputs.season.value}"
    weather_values = weather_store.get(weather_key, weather_store['default'])
    prediction_df['avg_temp_c'] = weather_values['avg_temp_c']
    prediction_df['total_precip_mm'] = weather_values['total_precip_mm']
    
    # 7. Set Soil Nutrient Features (Crucial Step)
    if inputs.use_shc:
        prediction_df['mean_ph'] = inputs.ph_value
        prediction_df['mean_n'] = inputs.n_value
        prediction_df['mean_p'] = inputs.p_value
        prediction_df['mean_k'] = inputs.k_value
    else:
        imputed_values = imputed_data_store.get(inputs.district.value, imputed_data_store['default'])
        prediction_df['mean_ph'] = imputed_values['mean_ph']
        prediction_df['mean_n'] = imputed_values['mean_n']
        prediction_df['mean_p'] = imputed_values['mean_p']
        prediction_df['mean_k'] = imputed_values['mean_k']

    # --- C. Make Prediction ---
    prediction_df_final = prediction_df[model_cols] # Ensure exact column order
    prediction_log1p = model_to_use.predict(prediction_df_final)[0]
    prediction_actual_yield = np.expm1(prediction_log1p)
    
    # --- D. Get Recommendations ---
    recommendations = get_recommendations(inputs, prediction_log1p)
    
    # --- E. Return JSON Response ---
    return {
        "predicted_yield_tonnes_per_hectare": prediction_actual_yield,
        "recommendations": recommendations,
        "model_used": model_name
    }

# --- 6. Root Endpoint (for health check) ---
@app.get("/")
async def root():
    return {"message": "Fasal Sahayak AI API is running."}