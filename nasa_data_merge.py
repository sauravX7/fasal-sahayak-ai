import pandas as pd
import requests
import time
from datetime import datetime

# --- Step 1: Load Your Cleaned Odisha Crop Data ---
filename = '/content/odisha_crop_production.csv'
print(f"Reading your cleaned dataset: '{filename}'...")
odisha_df = pd.read_csv(filename)
print("Dataset loaded successfully.")

# --- Step 2: Define District Coordinates and Season Dates ---
# Coordinates for all 30 districts in Odisha
district_coords = {
    'ANUGUL': (20.83, 85.09), 'BALANGIR': (20.71, 83.48), 'BALESHWAR': (21.49, 86.92),
    'BARGARH': (21.33, 83.62), 'BHADRAK': (21.06, 86.50), 'BOUDH': (20.84, 84.32),
    'CUTTACK': (20.46, 85.88), 'DEOGARH': (21.53, 84.73), 'DHENKANAL': (20.66, 85.59),
    'GAJAPATI': (19.08, 84.08), 'GANJAM': (19.38, 85.05), 'JAGATSINGHAPUR': (20.26, 86.17),
    'JAJAPUR': (20.84, 86.33), 'JHARSUGUDA': (21.87, 84.03), 'KALAHANDI': (19.85, 83.21),
    'KANDHAMAL': (20.43, 84.23), 'KENDRAPARA': (20.50, 86.42), 'KENDUJHAR': (21.63, 85.58),
    'KHORDHA': (20.18, 85.62), 'KORAPUT': (18.82, 82.72), 'MALKANGIRI': (18.35, 81.89),
    'MAYURBHANJ': (21.93, 86.75), 'NABARANGPUR': (19.23, 82.55), 'NAYAGARH': (20.13, 85.10),
    'NUAPADA': (20.83, 82.66), 'PURI': (19.81, 85.83), 'RAYAGADA': (19.17, 83.42),
    'SAMBALPUR': (21.47, 83.97), 'SONEPUR': (20.85, 83.90), 'SUNDARGARH': (22.12, 84.03)
}
# Define typical start/end dates for agricultural seasons in Odisha
season_dates = {
    'Kharif': ('06-01', '10-31'),
    'Rabi': ('11-01', '04-30'),
    'Summer': ('03-01', '06-30'),
    'Winter': ('12-01', '02-28'),
    'Autumn': ('09-01', '12-31'),
    'Whole Year': ('01-01', '12-31')
}

# --- Step 3: Function to Fetch and Process Weather Data ---
def get_weather_data(lat, lon, start_date, end_date):
    """Fetches daily weather data from NASA POWER API for a given period and location."""
    base_url = "https://power.larc.nasa.gov/api/temporal/daily/point"
    params = {
        "parameters": "T2M_MAX,T2M_MIN,PRECTOTCORR", # Max Temp, Min Temp, Precipitation
        "community": "AG",
        "longitude": lon,
        "latitude": lat,
        "start": start_date.replace('-', ''),
        "end": end_date.replace('-', ''),
        "format": "JSON"
    }
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()  # Raise an exception for bad status codes
        data = response.json()
        
        # Process data into a DataFrame
        df = pd.DataFrame(data['properties']['parameter'])
        df['T2M_AVG'] = (df['T2M_MAX'] + df['T2M_MIN']) / 2
        
        # Calculate summary statistics
        avg_temp = df['T2M_AVG'].mean()
        total_precip = df['PRECTOTCORR'].sum()
        
        return avg_temp, total_precip
    except requests.exceptions.RequestException as e:
        print(f"API Request failed for {start_date} to {end_date}: {e}")
        return None, None

# --- Step 4: Loop Through Crop Data and Enrich with Weather ---
odisha_df['Avg_Temp'] = None
odisha_df['Total_Precipitation'] = None
weather_cache = {}

print("\nStarting to fetch weather data from NASA POWER. This may take a while...")

for index, row in odisha_df.iterrows():
    district = row['District']
    year = int(str(row['Year']).split('-')[0])
    season = row['Season']

    if district in district_coords and season in season_dates:
        lat, lon = district_coords[district]
        start_month_day, end_month_day = season_dates[season]

        start_year = year
        end_year = year
        
        # This corrected block handles seasons that span two calendar years
        if season in ['Rabi', 'Winter']:
            end_year = year + 1

        start_date = f"{start_year}-{start_month_day}"
        end_date = f"{end_year}-{end_month_day}"
        
        cache_key = (district, start_date, end_date)

        if cache_key in weather_cache:
            avg_temp, total_precip = weather_cache[cache_key]
        else:
            avg_temp, total_precip = get_weather_data(lat, lon, start_date, end_date)
            weather_cache[cache_key] = (avg_temp, total_precip)
            time.sleep(0.1) # A small delay to be respectful to the API server

        odisha_df.at[index, 'Avg_Temp'] = avg_temp
        odisha_df.at[index, 'Total_Precipitation'] = total_precip
        
        if (index + 1) % 100 == 0:
            print(f"Processed {index + 1}/{len(odisha_df)} rows...")

print("\nWeather data fetching complete.")

# --- Step 5: Save the Final Enriched Dataset ---
final_filename = 'odisha_weather_crop_data.csv'
odisha_df.dropna(subset=['Avg_Temp', 'Total_Precipitation'], inplace=True) # Clean any rows where API failed
odisha_df.to_csv(final_filename, index=False)

print("\n✅ Success!")
print(f"Final enriched dataset saved as '{final_filename}'.")
print("It now includes 'Avg_Temp' and 'Total_Precipitation' for each growing season.")
print(odisha_df.head())