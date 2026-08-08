from django.urls import path, include
from rest_framework import routers
from .views import ProductModelViewSet, SignupView, LoginView, LogoutView

router = routers.DefaultRouter()
router.register(r'products', ProductModelViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
