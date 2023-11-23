from django.core.management.base import BaseCommand
from django.core.management.base import BaseCommand
from api.myModels.user import User
from django.utils import timezone
import bcrypt

class Command(BaseCommand):
    help = 'Carga datos de semilla en la base de datos'
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
                # Verificar si el usuario ya existe
                User.objects.get(strUserName=dataUser['strUserName'])
            except User.DoesNotExist:
                # Crear el usuario si no existe
                User.objects.create(
                    strUserName=dataUser['strUserName'],
                    strEmail=dataUser['strEmail'],
                    password=dataUser['password'],
                    createdAt=dataUser['createdAt'],
                    updatedAt=dataUser['updatedAt'],
                )

        self.stdout.write(self.style.SUCCESS('Carga de datos de semilla completa.'))
