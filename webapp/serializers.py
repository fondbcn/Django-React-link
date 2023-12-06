from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import todo
from django.contrib.auth.models import User

class todoSerializer(serializers.ModelSerializer):
    class Meta:
        model=todo
        fields=("id","title","description","completed","created_at")
        
class userSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields = ('username', 'email', 'password1', 'password2')
    def create(self, validated_data):
        password1 = validated_data.pop('password1', None)
        password2 = validated_data.pop('password2', None)
        if password1 != password2:
            raise serializers.ValidationError("Passwords do not match.")
        user = User(**validated_data)
        user.set_password(password1)
        user.save()
        return user
