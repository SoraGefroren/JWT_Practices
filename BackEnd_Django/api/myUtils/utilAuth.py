import os
import jwt
from pathlib import Path
from dotenv import load_dotenv
from django.conf import settings
from django.http import JsonResponse
from datetime import datetime, timedelta
from rest_framework.response import Response
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from ..myModels.user import User

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_FILE = os.path.join(BASE_DIR, '.env')  # Cambia la ruta según la ubicación real del archivo .env

def generateAccessToken(userId):
    user = User.objects.get(ideUser=userId)
    payload = {
        'exp': datetime.utcnow() + timedelta(minutes=50),
        'iat': datetime.utcnow(),
        'id': user.ideUser,
    }
    return str(jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8'))

def generateRefreshToken(userId):
    user = User.objects.get(ideUser=userId)
    payload = {
        'exp': datetime.utcnow() + timedelta(minutes=50),
        'iat': datetime.utcnow(),
        'id': user.ideUser,
    }
    return str(jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8'))

def verifyToken(token):
    try:
        # Verificar el token y decodificar la información del usuario
        decode = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        return {
            'userId': decode.get('id'),
        }
    except ExpiredSignatureError:
        return None
    except InvalidTokenError:
        return None
    except:
        return None

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
    user = User.objects.get(ideUser=decoded['userId'])
    if (not user):
        return {'user': user, 'tagLanguage': tagLanguage}
    else:
        tagLanguage = user.strDefaultLanguage or tagLanguage
    return {'user': user, 'tagLanguage': tagLanguage}

def renewAccessToken (req):
    return None

def verifyRefreshToken (req):
    refreshToken = req.POST.get('refreshToken', None)
    
    if not refreshToken or not verifyToken(refreshToken):
        return JsonResponse({'message': 'Invalid token'}, status=401)
    
    # decoded = RefreshToken(refreshToken).payload
    decoded = False
    if not decoded or decoded['type'] != 'refresh':
        return JsonResponse({'message': 'Invalid token'}, status=401)
    
    user = User.objects.filter(ideUser=decoded['userId']).first()
    
    if not user:
        return JsonResponse({'message': req.translate('invalidUser')}, status=401)

def protectRoute(view_func):
    def wrapped(request, *args, **kwargs):
        token = request.headers.get('Authorization', '')
        if not token or not token.strip() or not token.startswith('Bearer '):
            return JsonResponse({'message': request.translate('tokenNotProvided')}, status=401)
        try:
            decoded = verifyToken(token.split(' ')[1])
            if not decoded:
                return JsonResponse({'message': request.translate('invalidToken')}, status=401)
        except jwt.ExpiredSignatureError:
            return JsonResponse({'message': request.translate('invalidToken')}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({'message': request.translate('invalidToken')}, status=401)
        except:
            return JsonResponse({'message': request.translate('invalidToken')}, status=401)
        
        return view_func(request, *args, **kwargs)

    return wrapped