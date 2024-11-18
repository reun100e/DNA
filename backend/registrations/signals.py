from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Registration
from accounts.models import UserProfile


@receiver(post_save, sender=Registration)
def update_is_registered(sender, instance, **kwargs):
    """Update the is_registered and is_payment_complete fields in UserProfile based on Registration status."""
    profile = instance.user.profile

    # Update based on status
    if instance.status == "CANCELLED":
        profile.is_registered = False
        profile.is_payment_complete = False
    elif instance.status == "PAID":
        profile.is_registered = True
        profile.is_payment_complete = True
    else:
        # Handles cases where status is neither PAID nor CANCELLED
        profile.is_registered = True
        profile.is_payment_complete = False

    # Save the profile only once
    profile.save()
