import os
from pathlib import Path
from dotenv import load_dotenv
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.http import JsonResponse
from ..myModels.user import User

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_FILE = os.path.join(BASE_DIR, '.env')  # Cambia la ruta según la ubicación real del archivo .env

def generateAccessToken (userId):
    user = get_user_model().objects.get(id=userId)
    access_token = AccessToken.for_user(user)
    return str(access_token)

def generateRefreshToken (userId):
    user = get_user_model().objects.get(id=userId)
    refresh_token = RefreshToken.for_user(user)
    return str(refresh_token)

def verifyToken (token):
    try:
        AccessToken(token)
        return True
    except Exception:
        return False

def getTokenUser(token, req):
    user = None
    tagLanguage = os.getenv('LANGUAGE', default='en')
    tagAuthorization = req.headers.get('Authorization', '') or ' '
    token = token or tagAuthorization.split(' ')[1]
    if (not token):
        return {'user': user, 'tagLanguage': tagLanguage}
    decoded = verifyToken(token)
    if (not decoded):
        return {'user': user, 'tagLanguage': tagLanguage}
    user = User.objects.get(pk=decoded['userId'])
    if (not user):
        return {'user': user, 'tagLanguage': tagLanguage}
    else:
        tagLanguage = user.strDefaultLanguage or tagLanguage
    return {'user': user, 'tagLanguage': tagLanguage}

def protectRoute (req, res, next):
    return None

def renewAccessToken (req):
    return None

def verifyRefreshToken (req):
    refreshToken = req.POST.get('refreshToken', None)
    
    if not refreshToken or not verifyToken(refreshToken):
        return JsonResponse({'message': 'Invalid token'}, status=401)
    
    decoded = RefreshToken(refreshToken).payload
    
    if not decoded or decoded['type'] != 'refresh':
        return JsonResponse({'message': 'Invalid token'}, status=401)
    
    User = get_user_model()
    user = User.objects.filter(id=decoded['user_id']).first()
    
    if not user:
        return JsonResponse({'message': req.translate('invalidUser')}, status=401)
