from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken

from .utils import validate_phone_number, validate_name, validate_username

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[
            validate_username,
            UniqueValidator(
                queryset=User.objects.all(), message="Try a different Username."
            ),
        ]
    )
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="This email is already registered with DNA. Please use a different one.",
            )
        ],
    )
    password = serializers.CharField(write_only=True, min_length=8)
    first_name = serializers.CharField(
        required=True, max_length=30, validators=[validate_name]
    )
    last_name = serializers.CharField(
        required=True, max_length=30, validators=[validate_name]
    )
    phone_number = serializers.CharField(
        required=True, validators=[validate_phone_number]
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "phone_number",
            "dna_id",
        ]
        read_only_fields = ["dna_id"]  # Prevent users from providing their own dna_id

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            phone_number=validated_data.get("phone_number"),
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return {"user": user}
        raise ValidationError("Invalid credentials")

    def create(self, validated_data):
        user = self.validated_data["user"]
        refresh = RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }


from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["bio", "profile_picture"]


class BasicUserSerializer(serializers.ModelSerializer):
    """
    Serializes first_name and profile_picture for login and me endpoint calls. See implementation in LoginView
    """

    profile_picture = serializers.ImageField(source="profile.profile_picture")

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
            "is_phone_verified",
            "is_email_verified",
            "profile_picture",
        ]


class UserDetailSerializer(serializers.ModelSerializer):
    """Serializer for user profile, with restricted updates to specific fields."""

    phone_number = serializers.CharField(validators=[validate_phone_number])
    first_name = serializers.CharField(max_length=30, validators=[validate_name])
    last_name = serializers.CharField(max_length=30, validators=[validate_name])

    profile_picture = serializers.ImageField(source="profile.profile_picture", required=False)
    bio = serializers.CharField(source="profile.bio", required=False)

    is_registered = serializers.BooleanField(source="profile.is_registered")
    is_payment_complete = serializers.BooleanField(source="profile.is_payment_complete")

    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "is_phone_verified",
            "is_email_verified",
            "is_registered",
            "is_payment_complete",
            "dna_id",
            "profile_picture",
            "bio",
        ]
        read_only_fields = [
            "username",
            "is_phone_verified",
            "is_email_verified",
            "dna_id",
        ]

    def update(self, instance, validated_data):
        """Override to ensure only specific fields are updated and validated."""
        # Extract nested profile data if present
        profile_data = validated_data.pop('profile', {})

        # Update the User instance fields
        instance = super().update(instance, validated_data)

        # Update the related UserProfile fields
        profile = instance.profile
        for attr, value in profile_data.items():
            setattr(profile, attr, value)
        profile.save()

        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        profile_picture = representation.get("profile_picture")
        # Strip out the domain if present to ensure a relative path
        if profile_picture and profile_picture.startswith("http"):
            representation["profile_picture"] = profile_picture.split("8000")[-1]
        return representation
