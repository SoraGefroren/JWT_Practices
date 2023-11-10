
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

def languages(request):
    # Lógica de la vista para la ruta '/languages'
    # Puedes devolver una lista de idiomas como JSON
    return JsonResponse({'languages': ['es', 'en', 'fr']})
