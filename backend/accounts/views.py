from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import ValidationError
from .serializers import UserProfileSerializer, RegisterSerializer, LoginSerializer
from django.conf import settings
from django.utils.timezone import now


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    View to allow users to retrieve or update their profile.
    Only specific fields can be updated; others will raise a validation error.
    """
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """
        Retrieve the logged-in user.
        """
        return self.request.user

    def update(self, request, *args, **kwargs):
        """
        Handle both PUT and PATCH requests with proper validation.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Validate the incoming data with the serializer
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)  # Raise error if invalid

        # Perform the update and return a 200 OK response
        self.perform_update(serializer)

        # Return updated data and status code
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_update(self, serializer):
        """
        Save the updates only if allowed fields are modified.
        """
        if not serializer.validated_data:
            raise ValidationError({"detail": "No valid fields provided for update."})

        serializer.save()


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
                {"status": "success",  "message": "Login successful", "data": {"user": BasicUserSerializer(user).data}, "timestamp": now().isoformat()},
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
            samesite='None',
            max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()
        )

        response.set_cookie(
            key='refresh',
            value=refresh_token,
            httponly=True,
            secure=settings.SECURE_COOKIES,
            samesite='None',
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
            samesite="None",
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
        request.session.flush() # Logs the user out and clears session data
        return response

class VerifyEmailView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        return Response({"message": "Email Verified"}, status=status.HTTP_200_OK)


class VerifyPhoneView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        return Response({"message": "Phone Verified"}, status=status.HTTP_200_OK)