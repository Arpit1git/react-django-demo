# from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token 
# from django.http import Http404
from .models import Product
from .serializers import ProductSerializer, UserSerializer
from rest_framework import viewsets, generics, status
# Create your views here.

class ProductModelViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(owner=self.request.user)

    serializer_class = ProductSerializer

    def get_serializer(self, *args, **kwargs):
        if 'data' in kwargs:
              ismany = isinstance(kwargs["data"], list)
              kwargs["many"] = ismany
        return super().get_serializer(*args, **kwargs)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny] # Unauthenticated visitors can access this
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Save user instance with hashed password
        user = serializer.save()
        
        # Generate token for the newly created user
        token, _ = Token.objects.get_or_create(user=user)
        
        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            },
            "token": token.key
        }, status=status.HTTP_201_CREATED)