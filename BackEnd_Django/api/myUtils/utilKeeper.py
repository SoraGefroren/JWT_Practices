# middleware.py
from .utilFuncs import createTranslateFunction
from .utilFuncs import getDictionary
from .utilAuth import getTokenUser

class MyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        utl = getTokenUser(None, request)
        request.translate = createTranslateFunction(getDictionary(), utl['tagLanguage'])
        request.language = utl['tagLanguage']
        request.userLogged = utl['user']
        response = self.get_response(request)
        return response