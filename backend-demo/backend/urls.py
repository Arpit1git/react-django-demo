from django.urls import path, include
from rest_framework import routers
from .views import ProductModelViewSet, RegisterView

router = routers.DefaultRouter()
router.register(r'products', ProductModelViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
]
