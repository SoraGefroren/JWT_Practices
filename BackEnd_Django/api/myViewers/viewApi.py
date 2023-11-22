from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.authentication import JWTAuthentication

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class ApiIndex(APIView):
    def get(self, request, *args, **kwargs):
        return JsonResponse({'message': 'greetings'})

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class ApiUserInfo(APIView):
    def get(self, request, *args, **kwargs):
        return JsonResponse({'message': '', 'userInfo': {}})

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class ApiListMenus(APIView):
    def get(self, request, *args, **kwargs):
        return JsonResponse({'message': '', 'listMenus': []})