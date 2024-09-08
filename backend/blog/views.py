from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from rest_framework.pagination import PageNumberPagination
import bleach
from rest_framework.exceptions import PermissionDenied


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class BlogPostListView(generics.ListAPIView):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        # This ensures that the request object is passed to the serializer
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context


class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        content = serializer.validated_data.get("content", "")
        allowed_tags = ["b", "i", "u", "a", "p", "strong", "em", "ul", "li", "ol", "br"]
        allowed_attrs = {
            "a": ["href", "title"],
        }
        sanitized_content = bleach.clean(
            content, tags=allowed_tags, attributes=allowed_attrs
        )
        serializer.save(
            user=(
                self.request.user
                if not serializer.validated_data.get("anonymous", False)
                else None
            ),
            content=sanitized_content,
        )


class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class PostLikeUnlikeView(generics.GenericAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        post = self.get_object()
        user = request.user
        user_has_liked = post.likes.filter(
            id=user.id
        ).exists()  # Check if user has liked

        if user_has_liked:
            post.likes.remove(user)
            message = "Post unliked"
        else:
            post.likes.add(user)
            message = "Post liked"

        # Save changes and refresh the post instance
        post.save()
        post.refresh_from_db()

        # Serialize the updated post object
        serializer = self.get_serializer(post, context={"request": request})

        # Return a response with the updated data
        return Response(
            {"message": message, "post": serializer.data}, status=status.HTTP_200_OK
        )


class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        post_id = self.kwargs.get("post_id")
        post = Post.objects.get(id=post_id)
        serializer.save(user=self.request.user, post=post)


class PostCommentsListView(generics.ListAPIView):
    serializer_class = CommentSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        post_id = self.kwargs.get("post_id")
        return Comment.objects.filter(post_id=post_id).order_by("created_at")


class PostDeleteView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this post.")
        instance.delete()
