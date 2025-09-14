# backend/app.py

from flask import Flask
from backend.api.chat_routes import chat_bp
from backend.api.prediction_routes import predict_bp # 1. Import the new blueprint

app = Flask(__name__)

# Register the blueprints
app.register_blueprint(chat_bp)
app.register_blueprint(predict_bp) # 2. Register the new blueprint

@app.route('/')
def index():
    return "Fasal Sahayak Backend is running!"

if __name__ == '__main__':
    app.run(debug=True)