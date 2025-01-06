from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json
import asyncio
from django.conf import settings

# from chatbot.chatbot_logic import chatbot
from .simple_chatbot import SimpleChatbot  # Update import to use new chatbot

from datetime import datetime


# @method_decorator(csrf_exempt, name="dispatch")
# class ChatbotView(View):
#     async def post(self, request):
#         try:
#             # Parse JSON data
#             data = json.loads(request.body)
#             question = data.get("question")
#             user_name = data.get("user_name", "Friend")

#             # Validate input
#             if not question:
#                 return JsonResponse(
#                     {"error": "No question provided", "status": "error"}, status=400
#                 )

#             # Get chatbot response
#             response = await chatbot.answer(question, user_name)

#             # Return response with metadata
#             return JsonResponse(
#                 {
#                     "status": "success",
#                     "answer": response,
#                     "metadata": {
#                         "timestamp": datetime.now().isoformat(),
#                     },
#                 }
#             )

#         except json.JSONDecodeError:
#             return JsonResponse(
#                 {"error": "Invalid JSON format", "status": "error"}, status=400
#             )


#         except Exception as e:
#             return JsonResponse({"error": str(e), "status": "error"}, status=500)
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
            return JsonResponse({"status": "error", "error": str(e)}, status=500)
