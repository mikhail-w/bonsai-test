from django.core.management.base import BaseCommand
from chatbot.chatbot_logic import chatbot

class Command(BaseCommand):
    help = 'Interact with the chatbot via command line'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Welcome to the Zen Bonsai Chatbot!'))
        self.stdout.write('Type "exit" to quit.')
        
        user_name = input("What's your name? ")
        
        while True:
            question = input("You: ")
            if question.lower() == 'exit':
                break
            
            answer = chatbot.answer(question, user_name)
            self.stdout.write(self.style.SUCCESS(f"Zen Bonsai Master: {answer}"))
        
        self.stdout.write(self.style.SUCCESS('Thank you for chatting. May your bonsai grow with wisdom.'))