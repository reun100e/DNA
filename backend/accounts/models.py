from django.contrib.auth.models import AbstractUser
from django.db import models

import uuid
import base64

from django.db.models.signals import pre_save
from django.dispatch import receiver


class User(AbstractUser):
    phone_number = models.CharField(max_length=15, unique=True)
    is_phone_verified = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)

    dna_id = models.CharField(max_length=20, unique=True, blank=True, editable=False)

    def __str__(self):
        return self.username

# Function to generate Base32-encoded UUID
def generate_dna_id():
    uuid_bytes = uuid.uuid4().bytes
    return base64.b32encode(uuid_bytes).decode('utf-8').strip('=')


# Signal to assign the unique ID before saving the user
@receiver(pre_save, sender=User)
def set_unique_user_id(sender, instance, **kwargs):
    if not instance.dna_id:
        #The while loop guarantees that the generated ID is unique by checking against the database.
        while True:
            new_id = generate_dna_id()
            if not User.objects.filter(dna_id=new_id).exists():
                instance.dna_id = new_id
                break