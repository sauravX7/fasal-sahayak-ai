# core/chatbot/chatbot.py

import os
import asyncio
from rasa.core.agent import Agent

class ChatbotAgent:
    """A class to load and interact with a trained Rasa model."""

    def __init__(self):
        self.agent = None   
        self.model_path = os.path.join(os.getcwd(), 'backend', 'models')
        self.load_model()

    def load_model(self):
        """Loads the latest trained Rasa model."""
        try:
            # Get the latest model file
            model_files = os.listdir(self.model_path)
            latest_model = sorted(model_files)[-1]
            model_to_load = os.path.join(self.model_path, latest_model)
            
            print(f"Loading Rasa model: {model_to_load}")
            # Load the agent
            self.agent = Agent.load(model_to_load)
            print("Rasa model loaded successfully.")
        except Exception as e:
            print(f"Error loading Rasa model: {e}")
            self.agent = None

    async def handle_message(self, message: str) -> str:
        """
        Handles a user message and returns the bot's response.
        
        Args:
            message: The message from the user.
        
        Returns:
            The bot's text response.
        """
        if not self.agent:
            return "Chatbot model is not loaded. Please train the model first by running 'rasa train'."

        # Get the response from the Rasa agent
        responses = await self.agent.handle_text(message)
        
        if responses:
            # Extract the text from the first response
            bot_response = responses[0].get('text', "I'm sorry, I didn't understand that.")
            return bot_response
        
        return "I'm sorry, I could not generate a response."

# You can create a single instance to be used by the API
chatbot_instance = ChatbotAgent()