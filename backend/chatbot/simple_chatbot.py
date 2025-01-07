# chatbot/simple_chatbot.py

from typing import Dict
from openai import OpenAI  # Updated import
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.conf import settings
import json


class SimpleChatbot:
    def __init__(self, api_key: str):
        """Initialize the chatbot with OpenAI API key"""
        self.client = OpenAI(api_key=api_key)  # Create client instance
        self.conversation_history = []
        self.max_history = 10

    def add_to_history(self, role: str, content: str):
        """Add a message to conversation history"""
        self.conversation_history.append(
            {"role": role, "content": content, "timestamp": datetime.now().isoformat()}
        )

        if len(self.conversation_history) > self.max_history:
            self.conversation_history = self.conversation_history[-self.max_history :]

    def get_response(self, message: str, user_name: str = "User") -> Dict:
        """Get a response from the chatbot"""
        try:
            # Add user message to history
            self.add_to_history("user", message)

            # Prepare messages for API
            messages = [
                {
                    "role": "system",
                    "content": "You are a helpful and friendly assistant named Zen Master. Keep responses concise and engaging. Respond with a zen-like wisdom.",
                },
                *[
                    {"role": m["role"], "content": m["content"]}
                    for m in self.conversation_history[-5:]
                ],
            ]

            # Get response using new OpenAI API syntax
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                temperature=0.7,
                max_tokens=150,
            )

            # Extract response text using new API structure
            response_text = response.choices[0].message.content.strip()

            # Add response to history
            self.add_to_history("assistant", response_text)

            return {
                "status": "success",
                "answer": response_text,
                "metadata": {
                    "timestamp": datetime.now().isoformat(),
                },
            }

        except Exception as e:
            print(f"Error in get_response: {str(e)}")  # Add debugging
            return {
                "status": "error",
                "error": str(e),
                "metadata": {
                    "timestamp": datetime.now().isoformat(),
                },
            }


@method_decorator(csrf_exempt, name="dispatch")
class ChatbotView(View):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.chatbot = SimpleChatbot(api_key=settings.OPENAI_API_KEY)

    def post(self, request):
        try:
            data = json.loads(request.body)
            question = data.get("question")
            user_name = data.get("user_name", "User")

            if not question:
                return JsonResponse(
                    {"status": "error", "error": "No question provided"}, status=400
                )

            response = self.chatbot.get_response(question, user_name)
            return JsonResponse(response)

        except json.JSONDecodeError:
            return JsonResponse(
                {"status": "error", "error": "Invalid JSON format"}, status=400
            )

        except Exception as e:
            print(f"Error in post: {str(e)}")  # Add debugging
            return JsonResponse({"status": "error", "error": str(e)}, status=500)
