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

        user = User.objects.create(
            first_name=data.get("name", ""),
            username=data.get("email"),
            email=data.get("email"),
            password=make_password(data.get("password")),
        )

        # Create a user profile with an optional avatar
        avatar = request.FILES.get("avatar")
        UserProfile.objects.create(user=user, avatar=avatar)

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    data = request.data
    try:
        user.first_name = data.get("name", user.first_name)
        user.username = data.get("email", user.username)
        user.email = data.get("email", user.email)

        if data.get("password"):
            user.password = make_password(data["password"])

        user.save()

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

    except Exception as e:
        return Response(
            {"detail": f"An error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
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
