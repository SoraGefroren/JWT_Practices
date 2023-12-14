from rest_framework import routers
from django.urls import path, include
from ..myViewers import viewTranslations, viewApi
from django.views.decorators.csrf import csrf_exempt

myRouters = routers.DefaultRouter()
myRouters.register(r'translations', viewTranslations.ViewSet)

urlpatterns = [
    path('', include(myRouters.urls)),
    path('', csrf_exempt(viewApi.index), name='api-index'),
    path('tests', csrf_exempt(viewApi.tests), name='tests'),
    path('user-info', csrf_exempt(viewApi.userInfo), name='user-info'),
    path('list-menu', csrf_exempt(viewApi.listMenus), name='list-menu'),
]