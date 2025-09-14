# api/chat_routes.py

from flask import Blueprint, request, jsonify
import asyncio
from backend.core.chatbot.chatbot import chatbot_instance # Import the instance

# Create a Blueprint
chat_bp = Blueprint('chat_bp', __name__)

@chat_bp.route('/chat', methods=['POST'])
def chat():
    """Endpoint to interact with the chatbot."""
    user_message = request.json.get('message')
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Get the bot's response using our chatbot instance
    # asyncio.run() is used because Rasa's handle_text is asynchronous
    bot_response = asyncio.run(chatbot_instance.handle_message(user_message))
    
    return jsonify({"response": bot_response})