from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import login, logout
from .models import User
from .serializers import UserSerializer, UserRegistrationSerializer, UserLoginSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    """Get and update user profile"""
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class UserRegistrationView(generics.CreateAPIView):
    """Register a new user"""
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = []  # Allow anonymous registration
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'success': True,
            'message': 'User created successfully',
            'user': UserSerializer(user).data,
            'token': token.key
        }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([])  # Allow anonymous login
def login_view(request):
    """Login user and return token"""
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        login(request, user)
        
        return Response({
            'success': True,
            'message': 'Login successful',
            'user': UserSerializer(user).data,
            'token': token.key
        })
    
    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Logout user and delete token"""
    try:
        request.user.auth_token.delete()
    except:
        pass
    logout(request)
    
    return Response({
        'success': True,
        'message': 'Logout successful'
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_stats_view(request):
    """Get user statistics"""
    user = request.user
    # You can add more complex statistics here
    # For now, we'll use the basic fields from the model
    
    stats = {
        'total_observations': user.total_observations,
        'species_discovered': user.species_discovered,
        'score': user.score,
        'rank': 'Beginner',  # You can implement ranking logic
        'achievements': [],  # You can implement achievements
    }
    
    return Response(stats)
