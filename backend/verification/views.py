from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .services import create_otp, verify_otp
from .models import OTP
from django.contrib.auth import get_user_model

User = get_user_model()

class SendOTPView(APIView):
    """Send OTP for either email or phone verification."""

    def post(self, request):
        user = request.user
        otp_type = request.data.get("otp_type")

        if otp_type not in [OTP.EMAIL, OTP.PHONE]:
            return Response({"error": "Invalid OTP type"}, status=status.HTTP_400_BAD_REQUEST)

        # Send OTP
        create_otp(user, otp_type)
        return Response({"message": f"OTP sent to your {otp_type}"}, status=status.HTTP_200_OK)

class VerifyOTPView(APIView):
    """Verify OTP code for either email or phone verification."""

    def post(self, request):
        user = request.user
        otp_code = request.data.get("otp_code")
        otp_type = request.data.get("otp_type")

        if otp_type not in [OTP.EMAIL, OTP.PHONE]:
            return Response({"error": "Invalid OTP type"}, status=status.HTTP_400_BAD_REQUEST)

        # Verify OTP and update user status if successful
        if verify_otp(user, otp_code, otp_type):
            return Response({"message": f"{otp_type.capitalize()} verified successfully"}, status=status.HTTP_200_OK)

        return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)
