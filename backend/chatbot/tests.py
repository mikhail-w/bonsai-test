from django.test import TestCase
from django.urls import reverse
from chatbot.chatbot_logic import chatbot
import json

class ChatbotTestCase(TestCase):
    def test_chatbot_response(self):
        question = "What's the best way to start with bonsai?"
        user_name = "TestUser"
        response = chatbot.answer(question, user_name)
        self.assertIsNotNone(response)
        self.assertIn(user_name, response)
        self.assertIn("bonsai", response.lower())

    def test_api_endpoint(self):
        url = reverse('chat')
        data = {
            'question': "What's the best way to start with bonsai?",
            'user_name': 'TestUser'
        }
        response = self.client.post(url, json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        
        response_data = json.loads(response.content)
        self.assertIn('answer', response_data)
        self.assertIn('TestUser', response_data['answer'])
        self.assertIn('bonsai', response_data['answer'].lower())

    def test_no_question_provided(self):
        url = reverse('chat')
        data = {'user_name': 'TestUser'}
        response = self.client.post(url, json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        
        response_data = json.loads(response.content)
        self.assertIn('error', response_data)
        self.assertEqual(response_data['error'], 'No question provided')