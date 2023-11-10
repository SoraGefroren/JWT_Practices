from rest_framework import routers
from django.urls import path, include
from ..myViewers import viewMain, viewTranslations

myRouters = routers.DefaultRouter()

myRouters.register(r'translations', viewTranslations.ViewSet)

urlpatterns = [
    path('', include(myRouters.urls)),
    path('', viewMain.index, name='index'),
    path('languages', viewMain.languages, name='languages'),
    # url(r'^auth-jwt/', obtain_jwt_token),
    # url(r'^auth-jwt-refresh/', refresh_jwt_token),
    # url(r'^auth-jwt-verify/', verify_jwt_token),
]
