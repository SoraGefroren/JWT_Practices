from django.http import JsonResponse
from ..myUtils.utilAuth import protectRoute

@protectRoute
def index(request, *args, **kwargs):
    return JsonResponse({'message': 'greetings'})

@protectRoute
def tests(request, *args, **kwargs):
    return JsonResponse({'message': 'greetings'})

@protectRoute
def userInfo(request, *args, **kwargs):
    return JsonResponse({'message': '', 'userInfo': {}})

@protectRoute
def listMenus(request, *args, **kwargs):
    return JsonResponse({'message': '', 'listMenus': []})