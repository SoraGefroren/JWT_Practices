from django.http import JsonResponse

def login(request, *args, **kwargs):
    return JsonResponse({'translations': []})

def renewAccessToken(request, *args, **kwargs):
    return JsonResponse({'message': '', 'token': None})

def verifyRefreshToken(request, *args, **kwargs):
    return JsonResponse({'message': '', 'token': None})