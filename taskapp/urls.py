from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (UserView, LoginView,HomeView, 
                    RegisterView, RegisterAPIView, TaskModelViewSet)


router = routers.DefaultRouter()
router.register('tasks', TaskModelViewSet)

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('user/me/', UserView.as_view(), name='me'),
    
    path('api/', include(router.urls)),
    path('api/register/', RegisterAPIView.as_view(), name='api_register' ),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='home')

]
