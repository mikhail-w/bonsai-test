from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json
from .chatbot_logic import chatbot

# API view for chatbot interaction
@method_decorator(csrf_exempt, name='dispatch')  # Disable CSRF for API endpoints if using POST requests from React
class ChatbotView(View):
    def post(self, request):
        try:
            # Parse JSON from the request
            data = json.loads(request.body)
            question = data.get('question')
            user_name = data.get('user_name', 'Friend')  # Default to 'Friend' if no user_name is provided
            
            # Validate that a question is provided
            if not question:
                return JsonResponse({'error': 'No question provided'}, status=400)

            # Call the chatbot logic and return the response
            answer = chatbot.answer(question, user_name)
            return JsonResponse({'answer': answer})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

# Optional view for serving the chatbot page if needed (rare in React setups)
def chat_page(request):
    return JsonResponse({'message': 'This is the chat page, but React handles the frontend.'})
