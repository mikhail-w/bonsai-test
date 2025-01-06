# from django.urls import path
# from . import views

# urlpatterns = [
#     path('chat/', views.ChatbotView.as_view(), name='chat'),
# ]
# chatbot/urls.py

from django.urls import path
from .simple_chatbot import ChatbotView

urlpatterns = [
    path("chat/", ChatbotView.as_view(), name="chat"),
]
