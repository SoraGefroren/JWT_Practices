from django.db import models
from .userType import UserType
from .language import Language

class User(models.Model):
    db_table = 'tblUser'
    ideUser = models.BigAutoField(primary_key=True)
    strUserName = models.CharField(max_length=255)
    strEmail = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    strDefaultLanguage = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True, blank=True)
    ideUserType = models.ForeignKey(UserType, on_delete=models.SET_NULL, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.strEmail
