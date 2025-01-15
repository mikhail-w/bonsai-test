# base/urls/quote_urls.py
from django.urls import path
from base.views import quote_views as views

urlpatterns = [
    path("random/", views.get_random_quote, name="random_quote"),
]
