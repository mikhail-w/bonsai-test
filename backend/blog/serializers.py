from rest_framework import serializers
from .models import Post, Comment
from django.conf import settings


class PostSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    views = serializers.IntegerField(read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "user",
            "content",
            "image",
            "created_at",
            "likes_count",
            "comments_count",
            "views",
            "is_liked",
        ]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_is_liked(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.likes.filter(
                id=request.user.id
            ).exists()  # Check if the logged-in user has liked the post
        return False

    def get_image_url(self, obj):
        if obj.image and hasattr(obj.image, "url"):
            url = obj.image.url
            print(f"\n\POST IMG URL: {url}\n\n")
            print(f"MEDIA URL: {settings.MEDIA_URL}")
            return obj.image.url  # S3 automatically provides the full URL
        return None


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "post", "user", "content", "created_at"]
        read_only_fields = ["id", "user", "created_at", "post"]
