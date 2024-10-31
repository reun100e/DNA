from rest_framework import serializers
from .models import Badge, UserBadge

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ['id', 'name', 'description', 'icon']

class UserBadgeSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    badge = BadgeSerializer(read_only=True)

    class Meta:
        model = UserBadge
        fields = ['id', 'user', 'badge', 'awarded_date']
