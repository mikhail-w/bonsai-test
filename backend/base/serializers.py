from rest_framework import serializers
from django.contrib.auth.models import User
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserProfile, Product, Order, OrderItem, ShippingAddress, Review


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["avatar"]


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    avatar = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "_id", "username", "email", "name", "isAdmin", "avatar"]

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        return obj.first_name or obj.email

    def get_avatar(self, obj):
        try:
            return (
                obj.profile.avatar.url
            )  # Use the related_name `profile` from the model
        except UserProfile.DoesNotExist:
            return (
                settings.DEFAULT_AVATAR_URL
            )  # Ensure DEFAULT_AVATAR_URL is set in settings


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "_id",
            "username",
            "email",
            "name",
            "isAdmin",
            "avatar",
            "token",
        ]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Review
        fields = "__all__"

    def get_user(self, obj):
        return obj.user.first_name or obj.user.username


class ProductSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)  # Use nested serializer
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"

    def get_image_url(self, obj):
        if obj.image and hasattr(obj.image, "url"):
            return obj.image.url
        return (
            settings.PLACEHOLDER_IMAGE_URL
        )  # Ensure PLACEHOLDER_IMAGE_URL is set in settings


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OrderItem
        fields = "__all__"

    def get_product(self, obj):
        return ProductSerializer(obj.product, many=False).data


class OrderSerializer(serializers.ModelSerializer):
    orderItems = OrderItemSerializer(many=True, source="order_items", read_only=True)
    shippingAddress = ShippingAddressSerializer(
        source="shipping_address", read_only=True
    )
    user = UserSerializer(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"
