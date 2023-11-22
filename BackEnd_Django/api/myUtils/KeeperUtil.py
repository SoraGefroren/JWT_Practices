# middleware.py
from ..myModels.translation import Translation
# from . import get_dictionary

class KeeperUtil:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user_language = request.COOKIES.get('user_language', 'default')  # Ajusta según tu lógica
        # request.translation = lambda key: get_dictionary(user_language).get(key, key)
        response = self.get_response(request)
        return response
