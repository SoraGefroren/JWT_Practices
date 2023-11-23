# middleware.py
from .utilFuncs import getDictionary
from .utilAuth import getTokenUser

class MyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        utl = getTokenUser(None, request)
        dictTranslations = getDictionary()
        print('**********', utl)
        print('**********', dictTranslations)
        # request.COOKIES.get('user_language', 'default')
        # request.language = utl[1]
        # request.translate = lambda key: get_dictionary(user_language).get(key, key)
        response = self.get_response(request)
        return response
