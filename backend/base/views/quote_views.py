# base/views/quote_views.py
import requests
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_random_quote(request):
    try:
        # Add timeout to prevent hanging requests
        response = requests.get(
            "https://api.quotable.io/random",
            timeout=5,
            headers={"Accept": "application/json"},
        )
        response.raise_for_status()

        # Log the successful request
        logger.info(f"Successfully fetched quote for user {request.user.username}")

        return JsonResponse(response.json())
    except requests.RequestException as e:
        # Log the error
        logger.error(f"Failed to fetch quote: {str(e)}")
        return JsonResponse({"error": "Failed to fetch quote"}, status=500)
