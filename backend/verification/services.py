from .models import OTP
from django.core.mail import send_mail
from django.conf import settings
from datetime import timedelta
from django.utils import timezone
from django.core.exceptions import ValidationError
import random
import logging

logger = logging.getLogger(__name__)


def generate_otp_code():
    """Generate a secure 6-digit OTP code."""
    return f"{random.randint(100000, 999999)}"


def get_otp_resend_interval():
    """Get the OTP resend interval from settings, with a default fallback."""
    return getattr(settings, "OTP_RESEND_INTERVAL", 60)


def create_otp(user, otp_type):
    """Create or update an OTP, respecting rate limits."""
    resend_interval = get_otp_resend_interval()
    last_otp = (
        OTP.objects.filter(user=user, otp_type=otp_type, is_used=False)
        .order_by("-created_at")
        .first()
    )

    if last_otp and timezone.now() < last_otp.created_at + timedelta(
        seconds=resend_interval
    ):
        raise ValidationError(
            "OTP was sent recently. Please wait before requesting a new OTP."
        )

    # Determine target (email or phone number)
    target = user.email if otp_type == OTP.EMAIL else user.phone_number

    # Update existing OTP or create a new one if it doesn't exist
    code = generate_otp_code()
    otp_instance, created = OTP.objects.update_or_create(
        user=user,
        otp_type=otp_type,
        defaults={
            "code": code,
            "is_used": False,
            "created_at": timezone.now(),
            "target": target,  # Store target
        },
    )

    # Send OTP via email or SMS based on the type
    try:
        if otp_type == OTP.EMAIL:
            send_otp_email(user.email, code)
        elif otp_type == OTP.PHONE:
            send_otp_sms(user.phone_number, code)
    except Exception as e:
        logger.error(f"Failed to send OTP: {e}")
        raise ValidationError("Failed to send OTP. Please try again later.")

    return otp_instance


def send_otp_email(email, otp_code):
    """Send OTP to the user's email."""
    send_mail(
        "Your OTP Code",
        f"Please use this code to verify your email with DNA: {otp_code}",
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )


from twilio.rest import Client


def send_otp_sms(phone_number, otp_code):
    """Send OTP to the user's phone number using Twilio or another SMS gateway."""
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    message = client.messages.create(
        body=f"Your OTP code to verify with DNA is: {otp_code}",
        from_=settings.TWILIO_PHONE_NUMBER,
        to=phone_number,
    )
    logger.info(f"Message sent to {phone_number}: {message.sid}")


def verify_otp(user, otp_code, otp_type):
    """Verify if OTP is correct and not expired for a given type."""
    target = user.email if otp_type == OTP.EMAIL else user.phone_number
    otp_instance = OTP.objects.filter(
        user=user,
        code=otp_code,
        otp_type=otp_type,
        is_used=False,
        target=target,  # Ensure OTP target matches
    ).first()

    # Validate OTP
    if otp_instance and not otp_instance.is_expired():
        otp_instance.mark_as_used()
        if otp_type == OTP.EMAIL:
            user.is_email_verified = True
        elif otp_type == OTP.PHONE:
            user.is_phone_verified = True
        user.save(update_fields=["is_email_verified", "is_phone_verified"])
        return True
    return False
