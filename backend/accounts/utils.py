import re
from rest_framework.exceptions import ValidationError

# offensive words list - in future, use a separate offensive words library or database
OFFENSIVE_WORDS = ["admin", "offensive_word2", "offensive_word3"]

def validate_phone_number(value):
    if not re.match(r'^\+?\d{10,15}$', value):
        raise ValidationError("Invalid phone number format.")
    return value

def validate_name(value):
    if any(word in value.lower() for word in OFFENSIVE_WORDS):
        raise ValidationError("Name contains inappropriate language.")
    return value

def validate_username(value):
    if not value.isalnum():
        raise ValidationError("Username can only contain letters and numbers.")
    if any(word in value.lower() for word in OFFENSIVE_WORDS):
        raise ValidationError("Username contains inappropriate language.")
    return value
