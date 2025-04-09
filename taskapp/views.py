from django.shortcuts import render, redirect
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView, Response, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from .serializers import UserSerializer, RegisterSerializer, TaskSerializer
from .models import Task

# Create your views here.


class LoginView(View):
    template_name = 'login.html'
    
    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
    

class HomeView(View):
    template_name = 'home.html'

    def get(self, request):
        return render(request, self.template_name)
    
class RegisterView(View):
    template_name = 'register.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
    
class RegisterAPIView(APIView):
    permission_classes = [AllowAny,]
    def post(self, request):
        serializer=RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Regisration Done Successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskModelViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [AllowAny,]

# ViewSets define the view behavior.
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
