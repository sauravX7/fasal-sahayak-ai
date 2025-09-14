# backend/actions/actions.py

import os
import google.generativeai as genai
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

# Configure the Gemini model
try:
    genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))
    model = genai.GenerativeModel('gemini-pro')
except Exception as e:
    print(f"Error configuring Gemini: {e}")
    model = None

class ActionAskLLM(Action):
    def name(self) -> Text:
        return "action_ask_llm"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        user_message = tracker.latest_message.get('text')

        if model:
            # Add context for the model
            prompt = f"You are an expert agricultural assistant for farmers in India. Answer the following question in a helpful and concise way: {user_message}"

            try:
                response = model.generate_content(prompt)
                llm_response = response.text
            except Exception as e:
                llm_response = f"I'm sorry, I couldn't process that. Error: {e}"
        else:
            llm_response = "The AI model is not configured. Please check the API key."

        dispatcher.utter_message(text=llm_response)
        return []