from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserProfileSerializer, RegisterSerializer, LoginSerializer
from django.conf import settings


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    This view allows a logged-in user to view or update their own details.
    """
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access

    def get_object(self):
        # Return the logged-in user's data only
        return self.request.user


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import BasicUserSerializer


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]  # Get the user object
            tokens = (
                serializer.save()
            )  # Call the serializer's create() method to return tokens

            response = Response(
                {"detail": "Login successful", "user": BasicUserSerializer(user).data},
                status=status.HTTP_200_OK,
            )

            # Set access and refresh tokens as cookies
            self.set_auth_cookies(response, tokens)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def set_auth_cookies(response, tokens):
        """Set access and refresh tokens as HttpOnly cookies."""
        access_token = tokens.get('access')
        refresh_token = tokens.get('refresh')

        response.set_cookie(
            key='access',
            value=access_token,
            httponly=True,
            secure=settings.SECURE_COOKIES,
            samesite='Lax',
            max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()
        )

        response.set_cookie(
            key='refresh',
            value=refresh_token,
            httponly=True,
            secure=settings.SECURE_COOKIES,
            samesite='Strict',
            max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()
        )


from rest_framework_simplejwt.exceptions import TokenError


class RefreshTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh")
        if not refresh_token:
            return Response(
                {"detail": "Refresh token not found."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            refresh = RefreshToken(refresh_token)
            new_access_token = str(refresh.access_token)
        except TokenError as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED
            )

        response = Response(
            {"detail": "Access token refreshed"}, status=status.HTTP_200_OK
        )
        response.set_cookie(
            key="access",
            value=new_access_token,
            httponly=True,
            secure=settings.SECURE_COOKIES,  # Use secure=True in production
            samesite="Lax",
            max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds(),  # Set from SIMPLE_JWT settings
        )
        return response


class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.COOKIES.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist() # Blacklist the token
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        response = Response({"detail": "Logged out"}, status=status.HTTP_200_OK)
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        return response
