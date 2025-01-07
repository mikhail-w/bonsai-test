from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import UserProfile
from base.serializers import UserSerializer, UserSerializerWithToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # Include additional user data in the token response
        serializer = UserSerializerWithToken(self.user).data
        data.update(serializer)
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
def registerUser(request):
    data = request.data
    try:
        # Check if user with email already exists
        if User.objects.filter(email=data.get("email")).exists():
            return Response(
                {"detail": "User with this email already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create user
        user = User.objects.create(
            first_name=data.get("name", ""),
            username=data.get("email"),
            email=data.get("email"),
            password=make_password(data.get("password")),
        )

        # Create user profile
        user_profile = UserProfile.objects.create(user=user)

        # Handle avatar if provided
        avatar = request.FILES.get("avatar")
        if avatar:
            user_profile.avatar = avatar
            user_profile.save()

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        # Delete user if profile creation fails
        if "user" in locals():
            user.delete()
        message = str(e)
        if "avatar" in message.lower():
            message = "Error processing profile image. Please try again with a different image or no image."
        return Response(
            {"detail": message},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    try:
        user = request.user
        user_profile = UserProfile.objects.get_or_create(user=user)[0]

        # Handle avatar upload
        if "avatar" in request.FILES:
            # Delete old avatar file if it exists and is not the default
            if (
                user_profile.avatar
                and "default/avatar.jpg" not in user_profile.avatar.name
            ):
                try:
                    user_profile.avatar.delete(save=False)
                except Exception as e:
                    print(f"Error deleting old avatar: {e}")

            # Save new avatar
            user_profile.avatar = request.FILES["avatar"]
            user_profile.save()

        # Update user details
        if "name" in request.data:
            user.first_name = request.data["name"]
        if "email" in request.data:
            user.username = request.data["email"]
            user.email = request.data["email"]
        if "password" in request.data and request.data["password"]:
            user.password = make_password(request.data["password"])

        user.save()

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

    except Exception as e:
        message = str(e)
        if "avatar" in message.lower():
            message = "Error processing profile image. Please try again with a different image."
        return Response(
            {"detail": message},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    try:
        user = User.objects.get(id=pk)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response(
            {"detail": "User not found"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateUser(request, pk):
    try:
        user = get_object_or_404(User, id=pk)
        data = request.data

        user.first_name = data.get("name", user.first_name)
        user.username = data.get("email", user.username)
        user.email = data.get("email", user.email)
        user.is_staff = data.get("isAdmin", user.is_staff)

        user.save()

        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except KeyError as e:
        return Response(
            {"detail": f"Missing field: {str(e)}"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception as e:
        return Response(
            {"detail": f"An error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    try:
        user = get_object_or_404(User, id=pk)
        user.delete()
        return Response({"detail": "User was deleted successfully"})
    except Exception as e:
        return Response(
            {"detail": f"An error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
