

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']
        
        
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user  
    
    
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields = '__all__'