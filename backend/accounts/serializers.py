from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken

from .utils import validate_phone_number, validate_name, validate_username

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(validators=[validate_username, UniqueValidator(queryset=User.objects.all(), message="Try a different Username.")])
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="This email is already registered with DNA. Please use a different one.")]
    )
    password = serializers.CharField(write_only=True, min_length=8)
    first_name = serializers.CharField(required=True, max_length=30, validators=[validate_name])
    last_name = serializers.CharField(required=True, max_length=30, validators=[validate_name])
    phone_number = serializers.CharField(required=True, validators=[validate_phone_number])


    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name','phone_number', 'dna_id']
        read_only_fields = ['dna_id']  # Prevent users from providing their own dna_id


    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            phone_number=validated_data.get('phone_number'),
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return {'user': user}
        raise ValidationError("Invalid credentials")

    def create(self, validated_data):
        user = self.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }



class BasicUserSerializer(serializers.ModelSerializer):
    """
    Enough user info to be provided in response to login
    See implementation in LoginView
    """
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'dna_id']


# class UserProfileSerializer(serializers.ModelSerializer):
#     """
#     Serializer for the User model.
#     Allows updating only specific fields and prevents modification of read-only fields.
#     """
#     # Define allowed updatable fields for clarity
#     ALLOWED_FIELDS = {'first_name', 'last_name', 'email', 'phone_number'}

#     class Meta:
#         model = User
#         # User can see all these fields
#         fields = ['username','first_name', 'last_name', 'email', 'phone_number', 'is_phone_verified', 'is_email_verified', 'dna_id']
#         # User cannot edit these fields
#         read_only_fields = ['username', 'is_phone_verified', 'is_email_verified', 'dna_id']

#     def validate(self, attrs):
#         """
#         Validate that only allowed fields are updated.
#         """
#         invalid_fields = set(attrs) - self.ALLOWED_FIELDS
#         if invalid_fields:
#             raise serializers.ValidationError({
#                 field: f"{field} cannot be updated." for field in invalid_fields
#             })
#         return attrs

class UserProfileSerializer(serializers.ModelSerializer):

    """Serializer for user profile, with restricted updates to specific fields."""

    phone_number = serializers.CharField(validators=[validate_phone_number])
    first_name = serializers.CharField(max_length=30, validators=[validate_name])
    last_name = serializers.CharField(max_length=30, validators=[validate_name])

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'phone_number', 'is_phone_verified', 'is_email_verified', 'dna_id']
        read_only_fields = ['username', 'is_phone_verified', 'is_email_verified', 'dna_id']

    def update(self, instance, validated_data):
        """Override to ensure only specific fields are updated and validated."""
        instance = super().update(instance, validated_data)
        return instance


# class UserProfileSerializer(serializers.ModelSerializer):
#     """Serializer for user profile, with restricted updates to specific fields."""

#     class Meta:
#         model = User
#         fields = ['username', 'first_name', 'last_name', 'email', 'phone_number', 'is_phone_verified', 'is_email_verified', "dna_id"]
        # read_only_fields = ['username', 'is_phone_verified', 'is_email_verified', "dna_id"]

    # def update(self, instance, validated_data):
    #     """Override to ensure only specific fields are updated and validated."""
    #     instance = super().update(instance, validated_data)
    #     return instance