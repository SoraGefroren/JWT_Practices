from ..myModels.user import User
from ..myModels.logError import LogError
from ..myModels.logAccess import LogAccess
import re
import json
import bcrypt
from django.utils import timezone
from django.http import JsonResponse
from ..myUtils.utilAuth import generateAccessToken, generateRefreshToken, renewAccessToken as rwAccessToken, verifyRefreshToken as vfyRefreshToken

def login(request, *args, **kwargs):
    ipAddress = request.META.get('REMOTE_ADDR')
    extLanguage = ''
    username = ''
    try:
        # Tomar datos y buscar Usuario
        data = json.loads(request.body.decode('utf-8'))
        extLanguage = data.get('language', '')
        username = data.get('username', '')
        password = data.get('password', '')
        # Verificar existencia de usuario y contraseña
        if not username or not password:
            return JsonResponse({
                'message': request.translate('theUsernameAndOrPasswordIsIncorrect', extLanguage)
            })
        # Verificar si el usuario está bloqueado
        isBlocked = LogAccess.isBlocked(ipAddress, username)
        if isBlocked:
            LogAccess.setBlocked(ipAddress, username)
            return JsonResponse({
                'message': request.translate('yourAccessWasBlockedPleaseTryToEnterAgainInAFewMinutes', extLanguage)
            })
        # Verificar existencia de usuario
        user = None
        try:
            user = User.objects.get(strEmail=username)
        except User.DoesNotExist:
            wasBlocked = LogAccess.registerAccess(False, ipAddress, username)
            if wasBlocked:
                return JsonResponse({
                    'message': request.translate('youHaveExceededTheLimitOfAccessAttempts', extLanguage)
                })
            else:
                return JsonResponse({
                    'message': request.translate('theUsernameAndOrPasswordIsIncorrect', extLanguage)
                })
        # Comparar la contraseña proporcionada con la contraseña almacenada en la Base de Datos
        passwordMatch = bcrypt.checkpw(password.encode('utf-8'), re.sub(r"^b'(.+)'$", r"\1", str(user.password)).encode('utf-8'))
        if not passwordMatch:
            wasBlocked = LogAccess.registerAccess(False, ipAddress, username)
            if wasBlocked:
                return JsonResponse({
                    'message': request.translate('youHaveExceededTheLimitOfAccessAttempts', extLanguage)
                })
            else:
                return JsonResponse({
                    'message': request.translate('theUsernameAndOrPasswordIsIncorrect', extLanguage),
                })
        # Registrar acceso
        LogAccess.registerAccess(True, ipAddress, username)
        # Generar tokens JWT y enviarlos como respuesta
        refreshToken = generateRefreshToken(user.ideUser)
        accessToken = generateAccessToken(user.ideUser)
        userLanguage = ''
        if user.strDefaultLanguage:
            userLanguage = user.strDefaultLanguage.ideLanguage or extLanguage
        else:
            userLanguage = extLanguage
        # Respuesta
        return JsonResponse({
            'accessToken': accessToken,
            'refreshToken': refreshToken,
            'userLanguage': userLanguage
        })
    except Exception as error:
        # Manejar el error
        print(error)
        LogError.objects.create(
            strAddress=ipAddress,
            strAppOrigin='viewAuth',
            strParameters=str(request.POST or {}),
            strError=str(error),
            timeStamp=timezone.now,
        )
        return JsonResponse({'error': request.translate(request, 'internalServerError', extLanguage)}, status=500)

def renewAccessToken(request, *args, **kwargs):
    return rwAccessToken(request)

def verifyRefreshToken(request, *args, **kwargs):
    return vfyRefreshToken(request)