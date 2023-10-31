from django.db import models

class UserType(models.Model):
    ideUserType = models.BigAutoField(primary_key=True)
    strUserType = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.strUserType
