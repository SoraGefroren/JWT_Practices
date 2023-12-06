from django.core.management.base import BaseCommand
from django.core.management.base import BaseCommand
from api.myModels.userTypeHasItemMenu import UserTypeHasItemMenu
from api.myModels.translation import Translation
from api.myModels.userType import UserType
from api.myModels.itemMenu import ItemMenu
from api.myModels.language import Language
from api.myModels.user import User
from django.utils import timezone
import bcrypt
import json

class Command(BaseCommand):
    help = 'Carga datos de semilla en la BD'
    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Comenzando la carga de datos de semilla...'))
        hashedPassword = bcrypt.hashpw('test123'.encode('utf-8'), bcrypt.gensalt())
        aryUsers = [
            {
                'strUserName': 'Karen Haide',
                'strEmail': 'karen_haide@testo.com',
                'password': hashedPassword,
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strUserName': 'Smantha Monfil',
                'strEmail': 'smantha_monfil@testo.com',
                'password': hashedPassword,
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strUserName': 'Sonia Luna',
                'strEmail': 'sonia_luna@testo.com',
                'password': hashedPassword,
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            }
        ]
        for dataUser in aryUsers:
            try:
                # Verificar si el rgistro ya existe
                User.objects.get(strUserName=dataUser['strUserName'])
            except User.DoesNotExist:
                # Crear registro
                User.objects.create(
                    strUserName=dataUser['strUserName'],
                    strEmail=dataUser['strEmail'],
                    password=dataUser['password'],
                    createdAt=dataUser['createdAt'],
                    updatedAt=dataUser['updatedAt'],
                )
        aryTranslations = [
            {
                'strTranslation': json.dumps({
                    'es': "Servidor ejecutándose en",
                    'en': "Server running on",
                }),
                'strLabelKey': "serverRunningOn",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "El nombre de usuario y/o contraseña es incorrecto",
                    'en': "The username and/or password is incorrect",
                }),
                'strLabelKey': "theUsernameAndOrPasswordIsIncorrect",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Error interno del servidor",
                    'en': "Internal server error",
                }),
                'strLabelKey': "internalServerError",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Saludos",
                    'en': "Greetings",
                }),
                'strLabelKey': "greetings",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Token no proporcionado",
                    'en': "Token not provided",
                }),
                'strLabelKey': "tokenNotProvided",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Token inválido",
                    'en': "Invalid token",
                }),
                'strLabelKey': "invalidToken",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Usuario inválido",
                    'en': "Invalid user",
                }),
                'strLabelKey': "invalidUser",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Token válido",
                    'en': "Valid token",
                }),
                'strLabelKey': "validToken",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Su acceso fue bloqueado.\nPor favor, intenta entrar de nuevo en unos minutos",
                    'en': "Your access was blocked.\nPlease, try to enter again in a few minutes",
                }),
                'strLabelKey': "yourAccessWasBlockedPleaseTryToEnterAgainInAFewMinutes",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Ha superado el límite de intentos de acceso",
                    'en': "You have exceeded the limit of access attempts",
                }),
                'strLabelKey': "youHaveExceededTheLimitOfAccessAttempts",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Traducciones",
                    'en': "Translations",
                }),
                'strLabelKey': "translations",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Pruebas",
                    'en': "Tests",
                }),
                'strLabelKey': "tests",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Usuario",
                    'en': "User",
                }),
                'strLabelKey': "user",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Contraseña",
                    'en': "Password",
                }),
                'strLabelKey': "password",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Acceso",
                    'en': "Login",
                }),
                'strLabelKey': "login",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Se requiere el usuario",
                    'en': "The user is required",
                }),
                'strLabelKey': "theUserIsRequired",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "La contraseña es requerida",
                    'en': "The password is required",
                }),
                'strLabelKey': "thePasswordIsRequired",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Cerrar sesión",
                    'en': "Log out",
                }),
                'strLabelKey': "logOut",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Salir",
                    'en': "Exit",
                }),
                'strLabelKey': "exit",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Español",
                    'en': "Spanish",
                }),
                'strLabelKey': "spanish",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strTranslation': json.dumps({
                    'es': "Inglés",
                    'en': "English",
                }),
                'strLabelKey': "english",
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            }
        ]
        for dataTranslation in aryTranslations:
            try:
                # Verificar si el rgistro ya existe
                Translation.objects.get(strLabelKey=dataTranslation['strLabelKey'])
            except Translation.DoesNotExist:
                # Crear registro
                Translation.objects.create(
                    strTranslation=dataTranslation['strTranslation'],
                    strLabelKey=dataTranslation['strLabelKey'],
                    createdAt=dataTranslation['createdAt'],
                    updatedAt=dataTranslation['updatedAt'],
                )
        aryUserTypes = [
            {
                'strUserType': 'Admin',
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'strUserType': 'Guest',
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            }
        ]
        for dataUserType in aryUserTypes:
            try:
                # Verificar si el rgistro ya existe
                UserType.objects.get(strUserType=dataUserType['strUserType'])
            except UserType.DoesNotExist:
                # Crear registro
                UserType.objects.create(
                    strUserType=dataUserType['strUserType'],
                    createdAt=dataUserType['createdAt'],
                    updatedAt=dataUserType['updatedAt'],
                )
        myTranslation01 = Translation.objects.get(strLabelKey='tests')
        myTranslation02 = Translation.objects.get(strLabelKey='translations')
        aryItemsMenu = [
            {
                'Translation': myTranslation01,
                'strLink': '/tests',
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'Translation': myTranslation02,
                'strLink': '/translations',
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            }
        ]
        for dataItemMenu in aryItemsMenu:
            try:
                # Verificar si el rgistro ya existe
                ItemMenu.objects.get(strLink=dataItemMenu['strLink'])
            except ItemMenu.DoesNotExist:
                # Crear registro
                ItemMenu.objects.create(
                    ideTranslation=dataItemMenu['Translation'],
                    strLink=dataItemMenu['strLink'],
                    createdAt=dataItemMenu['createdAt'],
                    updatedAt=dataItemMenu['updatedAt'],
                )
        myUserType = UserType.objects.get(strUserType='Admin')
        myItemsMenu = ItemMenu.objects.all()
        for myItemMenu in myItemsMenu:
            keyToRegister = str(myUserType.ideUserType) + '-' + str(myItemMenu.ideItemMenu)
            try:
                # Verificar si el rgistro ya existe
                UserTypeHasItemMenu.objects.get(ideUserTypeHasItemMenu=keyToRegister)
            except UserTypeHasItemMenu.DoesNotExist:
                # Crear registro
                UserTypeHasItemMenu.objects.create(
                    ideUserTypeHasItemMenu=keyToRegister,
                    ideUserType=myUserType,
                    ideItemMenu=myItemMenu,
                    timeStamp=timezone.now()
                )
        myUser = User.objects.get(strEmail='karen_haide@testo.com')
        myUser.ideUserType = myUserType
        myUser.save()
        myTranslationEnglish = Translation.objects.get(strLabelKey='english')
        myTranslationSpanish = Translation.objects.get(strLabelKey='spanish')
        aryLangs = [
            {
                'ideLanguage': 'en',
                'strLanguage': 'English',
                'Translation': myTranslationEnglish,
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
            {
                'ideLanguage': 'es',
                'strLanguage': 'Español',
                'Translation': myTranslationSpanish,
                'createdAt': timezone.now(),
                'updatedAt': timezone.now(),
            },
        ]
        for dataLang in aryLangs:
            try:
                # Verificar si el rgistro ya existe
                Language.objects.get(ideLanguage=dataLang['ideLanguage'])
            except Language.DoesNotExist:
                # Crear registro
                Language.objects.create(
                    ideLanguage=dataLang['ideLanguage'],
                    strLanguage=dataLang['strLanguage'],
                    ideTranslation=dataLang['Translation'],
                    createdAt=dataLang['createdAt'],
                    updatedAt=dataLang['updatedAt'],
                )
        myLang = Language.objects.get(ideLanguage='es')
        myUser = User.objects.get(strEmail='karen_haide@testo.com')
        myUser.strDefaultLanguage = myLang
        myUser.save()
        self.stdout.write(self.style.SUCCESS('Carga de datos de semilla completa.'))
