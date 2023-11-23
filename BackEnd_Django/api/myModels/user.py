from django.db import models
from .userType import UserType
from .language import Language

class User(models.Model):
    ideUser = models.BigAutoField(primary_key=True)
    strUserName = models.CharField(max_length=255)
    strEmail = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    strDefaultLanguage = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True, blank=True)
    ideUserType = models.ForeignKey(UserType, on_delete=models.SET_NULL, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'tblUser'
    
    def __str__(self):
        return self.strEmail
