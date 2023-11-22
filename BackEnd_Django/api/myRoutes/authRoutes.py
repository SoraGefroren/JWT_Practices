from rest_framework import routers
from django.urls import path, include
from ..myViewers import viewTranslations, viewApi

myRouters = routers.DefaultRouter()
myRouters.register(r'translations', viewTranslations.ViewSet)

urlpatterns = [
    path('', include(myRouters.urls)),
    path('', viewApi.ApiIndex.as_view(), name='api-index'),
    path('tests', viewApi.ApiIndex.as_view(), name='tests'),
    path('user-info', viewApi.ApiUserInfo.as_view(), name='user-info'),
    path('list-menu', viewApi.ApiListMenus.as_view(), name='list-menu'),
]