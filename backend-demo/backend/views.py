from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, status, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Product
from .serializers import ProductSerializer, UserSerializer
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

class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "message": "User created!",
                "user":{
                    "id": user.id,
                    "username": user.username,
                    "email": user.email
                },
                'token': token.key
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Login Successful!",
                "token": token.key
            }, status=status.HTTP_200_OK)
        
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response({
            "message": "sucessfully logged out!"
        }, status=status.HTTP_200_OK)