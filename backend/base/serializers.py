from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from django.conf import settings

from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Order, OrderItem, ShippingAddress, Review

import logging

logger = logging.getLogger(__name__)


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
        # fields = ["id", "username", "email"]
        fields = ["id", "_id", "username", "email", "name", "isAdmin", "avatar"]

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == "":
            name = obj.email
        return name

    def get_avatar(self, obj):
        try:
            return obj.userprofile.avatar.url
        except UserProfile.DoesNotExist:
            return None
        except AttributeError:
            return None


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
        print(f"Generated Token for User ID {obj.id}: {token}")
        return str(token.access_token)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"

    def get_image_url(self, obj):
        # If image exists, return the media URL
        if obj.image and hasattr(obj.image, "url"):
            return obj.image.url
        # Otherwise, return the default static image path
        return settings.PLACEHOLDER_IMAGE_URL

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        logging.info(f"Order items for {obj}: {items}")
        serializer = OrderItemSerializer(items, many=True)
        logging.info(f"Serialized order items Count: {len(serializer.data)}\n")
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
            # logging.info(f"Shipping address for {obj}: {address}")
        except Exception as e:
            # logging.error(f"Error fetching shipping address: {e}")
            address = False
            raise
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
