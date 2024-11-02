from .models import OTP
from django.core.mail import send_mail
from django.conf import settings
from datetime import timedelta
from django.utils import timezone
from django.core.exceptions import ValidationError
import random

def generate_otp_code():
    """Generate a 6-digit OTP code."""
    return f"{random.randint(100000, 999999)}"

def create_otp(user, otp_type):
    """Create or update an OTP, respecting rate limits."""
    # Check if the last OTP was created too recently
    last_otp = OTP.objects.filter(user=user, otp_type=otp_type, is_used=False).order_by('-created_at').first()

    if last_otp and timezone.now() < last_otp.created_at + timedelta(seconds=settings.OTP_RESEND_INTERVAL):
        raise ValidationError("OTP was sent recently. Please wait before requesting a new OTP.")

    # Update existing OTP or create a new one if it doesn't exist
    code = generate_otp_code()
    otp_instance, created = OTP.objects.update_or_create(
        user=user,
        otp_type=otp_type,
        defaults={
            'code': code,
            'is_used': False,
            'created_at': timezone.now()
        }
    )

    # Send OTP via email or SMS based on the type
    if otp_type == OTP.EMAIL:
        send_otp_email(user.email, code)
    elif otp_type == OTP.PHONE:
        send_otp_sms(user.phone_number, code)

    return otp_instance







def send_otp_email(email, otp_code):
    """Send OTP to the user's email."""
    send_mail(
        "Your OTP Code",
        f"Use this code to verify your email: {otp_code}",
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )

from twilio.rest import Client
from django.conf import settings

def send_otp_sms(phone_number, otp_code):
    """Send OTP to the user's phone number using Twilio or another SMS gateway."""
    try:
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body=f"Your OTP code is: {otp_code}",
            from_=settings.TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        print(f"Message sent to {phone_number}: {message.sid}")
    except Exception as e:
        # Handle exception or log error
        print(f"Failed to send SMS: {e}")


def verify_otp(user, otp_code, otp_type):
    """Verify if OTP is correct and not expired for a given type."""
    otp_instance = OTP.objects.filter(user=user, code=otp_code, otp_type=otp_type, is_used=False).first()

    # Validate the OTP and mark it as used
    if otp_instance and not otp_instance.is_expired():
        otp_instance.is_used = True
        otp_instance.save()

        # Update user's verification status
        if otp_type == OTP.EMAIL:
            user.is_email_verified = True
        elif otp_type == OTP.PHONE:
            user.is_phone_verified = True
        user.save()

        return True
    return False
