from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
import re
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="This email is already registered with DNA. Please use a different one.")]
    )
    password = serializers.CharField(write_only=True, min_length=8)
    first_name = serializers.CharField(required=True, max_length=30)
    last_name = serializers.CharField(required=True, max_length=30)

    def validate_phone_number(self, value):
        if not re.match(r'^\+?\d{10,15}$', value):
            raise ValidationError("Invalid phone number format.")
        return value

    def validate(self, data):
        if not data.get('first_name').strip():
            raise ValidationError({"first_name": "First name cannot be empty."})
        if not data.get('last_name').strip():
            raise ValidationError({"last_name": "Last name cannot be empty."})
        return data

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name','phone_number', 'dna_id']
        read_only_fields = ['dna_id']  # Prevent users from changing dna_id


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
        raise serializers.ValidationError("Invalid credentials")

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


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # User can see all these fields
        fields = ['username','first_name', 'last_name', 'email', 'phone_number', 'is_phone_verified', 'is_email_verified', 'dna_id']
        # User cannot edit these fields
        read_only_fields = ['username', 'is_phone_verified', 'is_email_verified', 'dna_id']

    def update(self, instance, validated_data):
        # Only allow updating email and phone_number
        instance.email = validated_data.get('email', instance.email)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()
        return instance
