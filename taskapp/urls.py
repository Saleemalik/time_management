from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (UserViewSet, LoginView,
                    HomeView, RegisterView)


router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='home')

]
