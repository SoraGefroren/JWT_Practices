from django.urls import path
from ..myViewers import viewFree, viewAuth
from django.views.decorators.http import require_POST

urlpatterns = [
    path('', viewFree.index, name='index'),
    path('languages', viewFree.languages, name='languages'),
    path('translations', viewFree.translations, name='translations'),
    path('translations/<str:language>', viewFree.translations, name='languages'),
    # Ruta pára iniciar sesión y obtener un accessToken
    path('login', require_POST(viewAuth.login), name='login'),
    # Ruta para proteger y renovar el accessToken utilizando el refreshToken
    path('refresh', require_POST(viewAuth.renewAccessToken), name='refresh'),
    # Ruta para validar el refreshToken
    path('verify-refresh', require_POST(viewAuth.verifyRefreshToken), name='verify-refresh'),
]


