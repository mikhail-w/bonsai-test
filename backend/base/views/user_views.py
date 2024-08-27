from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.models import CustomUser  # Import your custom user model
from base.serializers import UserSerializer, UserSerializerWithToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
def registerUser(request):
    data = request.data
    try:
        print("3 user_views.py Request", request)
        print("Data:", data)
        user = CustomUser.objects.create(
            name=data["email"],
            email=data["email"],
            city=data.get("city", ""),
            state=data.get("state", ""),
            profile_image=data.get("profile_image", None),
            password=make_password(data["password"]),
        )

        print("USER:", user)

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except Exception as e:
        message = {"detail": "User with this email already exists"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def uploadImage(request):
    data = request.data
    print("Data:", data)
    # profile_image = data["profile_image"]
    # product = Product.objects.get(_id=product_id)

    # product.image = request.FILES.get("image")
    # product.save()

    return Response("Image was uploaded")


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.name = data["email"]
    user.email = data["email"]
    user.city = data.get("city", user.city)
    user.state = data.get("state", user.state)
    user.profile_image = data.get("profile_image", user.profile_image)

    if data["password"] != "":
        user.password = make_password(data["password"])

    user.save()

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = get_object_or_404(CustomUser, id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    # user = User.objects.get(id=pk)
    user = get_object_or_404(CustomUser, id=pk)

    data = request.data

    user.name = data["name"]
    user.username = data["email"]
    user.email = data["email"]
    user.is_staff = data["isAdmin"]

    if data.get("password", ""):
        user.password = make_password(data["password"])

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    # userForDeletion = User.objects.get(id=pk)
    userForDeletion = get_object_or_404(CustomUser, id=pk)
    userForDeletion.delete()
    return Response("User was deleted")
