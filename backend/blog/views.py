from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
from rest_framework.pagination import PageNumberPagination
import bleach


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10  
    page_size_query_param = 'page_size'
    max_page_size = 100


class BlogPostListView(generics.ListAPIView):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticatedOrReadOnly]

class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Retrieve the content from the serializer's validated data
        content = serializer.validated_data.get('content', '')

        # Define allowed tags and attributes for sanitization
        allowed_tags = ['b', 'i', 'u', 'a', 'p', 'strong', 'em', 'ul', 'li', 'ol', 'br']
        allowed_attrs = {
            'a': ['href', 'title'],
        }

        # Sanitize the content using bleach
        sanitized_content = bleach.clean(
            content,
            tags=allowed_tags,
            attributes=allowed_attrs
        )

        # Save the post with the sanitized content
        serializer.save(
            user=self.request.user if not serializer.validated_data.get('anonymous', False) else None,
            content=sanitized_content
        )


