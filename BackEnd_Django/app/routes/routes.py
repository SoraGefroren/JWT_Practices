from django.urls import path
from ..views import views

urlpatterns = [
    path('', views.index, name='index'),
    path('languages', views.languages, name='languages'),
    path('translations', views.translations, name='translations'),
    path('translations/<str:language>', views.translations, name='translations_language'),
    path('login', views.login, name='login'),
    path('refresh', views.renew_access_token, name='refresh'),
    path('verify-refresh', views.verify_refresh_token, name='verify_refresh'),
    # Rutas Protegidas
    path('api', views.index, name='api'),
    path('api/tests', views.tests, name='tests'),
    path('api/user-info', views.user_info, name='user_info'),
    path('api/list-menu', views.list_menus, name='list_menus'),
]
