from django.test import TestCase
from django.urls import reverse
from chatbot.chatbot_logic import chatbot
import json


class EnhancedChatbotTestCase(TestCase):
    def setUp(self):
        # Reset conversation history before each test
        chatbot.conversation_history.messages = []

    def test_basic_response(self):
        """Test basic response generation"""
        question = "What's the best way to start with bonsai?"
        user_name = "TestUser"
        response = chatbot.answer(question, user_name)

        self.assertIsNotNone(response)
        self.assertIn(user_name, response)
        self.assertIn("bonsai", response.lower())

    def test_conversation_continuity(self):
        """Test that the chatbot maintains conversation context"""
        # First question
        response1 = chatbot.answer("What is bonsai?", "TestUser")

        # Follow-up question
        response2 = chatbot.answer("How often should I water it?", "TestUser")

        # Check that second response acknowledges previous context
        self.assertGreater(len(chatbot.conversation_history.messages), 1)
        self.assertIsNotNone(response2)

    def test_api_endpoint(self):
        """Test the API endpoint with enhanced response format"""
        url = reverse("chat")
        data = {
            "question": "What's the best way to start with bonsai?",
            "user_name": "TestUser",
        }

        response = self.client.post(
            url, json.dumps(data), content_type="application/json"
        )

        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)

        # Check enhanced response format
        self.assertIn("status", response_data)
        self.assertIn("answer", response_data)
        self.assertIn("metadata", response_data)

    def test_error_handling(self):
        """Test various error conditions"""
        url = reverse("chat")

        # Test missing question
        response = self.client.post(
            url, json.dumps({"user_name": "TestUser"}), content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)

        # Test invalid JSON
        response = self.client.post(
            url, "invalid json", content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)

    def test_conversation_history_limit(self):
        """Test that conversation history is properly limited"""
        # Add more messages than the limit
        for i in range(15):
            chatbot.answer(f"Question {i}", "TestUser")

        # Check that history is limited
        self.assertLessEqual(
            len(chatbot.conversation_history.messages),
            chatbot.conversation_history.max_messages,
        )
