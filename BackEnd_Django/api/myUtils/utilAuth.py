import os
import jwt
import time
import json
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
        'exp': datetime.utcnow() + timedelta(minutes=15),
        'iat': datetime.utcnow(),
        'id': user.ideUser,
    }
    return str(jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8'))

def generateRefreshToken(userId):
    user = User.objects.get(ideUser=userId)
    payload = {
        'exp': datetime.utcnow() + timedelta(minutes=30),
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
            'exp': decode.get('exp')
        }
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
    user = None
    try:
        user = User.objects.get(ideUser=decoded['userId'])
    except User.DoesNotExist:
        user = None
    if (not user):
        return {'user': user, 'tagLanguage': tagLanguage}
    else:
        if user.strDefaultLanguage:
            tagLanguage = user.strDefaultLanguage.ideLanguage
    return {'user': user, 'tagLanguage': tagLanguage}

def protectRoute(view_func):
    def wrapped(request, *args, **kwargs):
        token = request.headers.get('Authorization', '')
        if not token or not token.strip() or not token.startswith('Bearer '):
            return JsonResponse({'message': request.translate('tokenNotProvided')}, status=401)
        try:
            decoded = verifyToken(token.split(' ')[1])
            if not decoded:
                return JsonResponse({'message': request.translate('invalidToken')}, status=401)
            else:
                request.userId = decoded['userId']
        except:
            return JsonResponse({'message': request.translate('invalidToken')}, status=401)
        return view_func(request, *args, **kwargs)
    return wrapped

def renewAccessToken (request):
    try:
        # Tomar datos y buscar Usuario
        data = json.loads(request.body.decode('utf-8'))
        refreshToken = data.get('refreshToken', '').strip()
        if not refreshToken:
            return JsonResponse({'message': request.translate('tokenNotProvided')}, status=401)
        decoded = verifyToken(refreshToken.split(' ')[1])
        if not decoded:
            return JsonResponse({'message': request.translate('invalidToken')}, status=401)
        user = None
        try:
            user = User.objects.get(ideUser=decoded['userId'])
        except User.DoesNotExist:
            return JsonResponse({'message': request.translate('invalidUser')}, status=401)
        try:
            newRefreshToken = None
            # Calcular vigencia del refreshToken en segundos
            currentTimestamp = int(time.time())
            # Tiempo restante en segundos
            timeRemaining = decoded['exp'] - currentTimestamp
            # Umbral de tiempo para renovar el refreshToken para 5 minutos en segundos
            if timeRemaining <= (5 * 60):
                # Si queda menos o igual tiempo del umbral, generar un nuevo refreshToken
                newRefreshToken = generateRefreshToken(decoded['userId'])
            # Emitir un nuevo accessToken
            accessToken = generateAccessToken(decoded['userId'])
            return JsonResponse({
                'refreshToken': newRefreshToken,
                'accessToken': accessToken,
            })
        except:
            return JsonResponse({'message': request.translate('invalidToken')}, status=401)
    except Exception as error:
        return JsonResponse({'message': request.translate('tokenNotProvided')}, status=401)

def verifyRefreshToken (request):
    try:
        # Tomar datos y buscar Usuario
        data = json.loads(request.body.decode('utf-8'))
        refreshToken = data.get('refreshToken', '').strip()
        if not refreshToken:
            return JsonResponse({'message': request.translate('tokenNotProvided')}, status=401)
        decoded = verifyToken(refreshToken.split(' ')[1])
        if not decoded:
            return JsonResponse({'message': request.translate('invalidToken')}, status=401)
        user = None
        try:
            user = User.objects.get(ideUser=decoded['userId'])
        except User.DoesNotExist:
            return JsonResponse({'message': request.translate('invalidUser')}, status=401)
        return JsonResponse({
            'message': request.translate('validToken')
        })
    except Exception as error:
        return JsonResponse({'message': request.translate('invalidToken')}, status=401)
