# backend/api/prediction_routes.py

# backend/api/prediction_routes.py

import joblib
import pandas as pd
from flask import Blueprint, request, jsonify

predict_bp = Blueprint('predict_bp', __name__)

# --- Load Models and Encoders ---
try:
    fert_model_path = 'backend/ml/fertilizer_recommendation_model.joblib'
    soil_encoder_path = 'backend/ml/soil_encoder.joblib'
    crop_encoder_path = 'backend/ml/crop_encoder.joblib'

    fert_model = joblib.load(fert_model_path)
    soil_encoder = joblib.load(soil_encoder_path)
    crop_encoder = joblib.load(crop_encoder_path)
except FileNotFoundError:
    fert_model, soil_encoder, crop_encoder = None, None, None

@predict_bp.route('/predict_fertilizer', methods=['POST'])
def predict_fertilizer():
    """Endpoint to predict the best fertilizer based on input data."""
    if not all([fert_model, soil_encoder, crop_encoder]):
        return jsonify({"error": "Model or encoders not found."}), 500

    data = request.json

    try:
        # Create a DataFrame from the incoming data
        input_df = pd.DataFrame([data])

        # Pre-process the categorical data using the loaded encoders
        input_df['Soil Type'] = soil_encoder.transform(input_df['Soil Type'])
        input_df['Crop Type'] = crop_encoder.transform(input_df['Crop Type'])

        # Make a prediction
        prediction = fert_model.predict(input_df)

        # Return the prediction
        return jsonify({"predicted_fertilizer": prediction[0]})

    except Exception as e:
        return jsonify({"error": str(e)}), 400