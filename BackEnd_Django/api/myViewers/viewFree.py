from django.http import JsonResponse

def index(request, *args, **kwargs):
    return JsonResponse({
        'message': 'greetings'
    })

def languages(request, *args, **kwargs):
    return JsonResponse({'languages': ['es', 'en', 'fr']})

def translations(request, *args, **kwargs):
    return JsonResponse({'translations': []})