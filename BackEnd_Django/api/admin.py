from django.contrib import admin

# Register your models here.
from .models import ItemMenu, Language, Translation, User, UserType, UserTypeHasItemMenu

admin.site.register(ItemMenu)
admin.site.register(Language)
admin.site.register(Translation)
admin.site.register(User)
admin.site.register(UserType)
admin.site.register(UserTypeHasItemMenu)