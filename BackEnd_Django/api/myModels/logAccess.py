from django.db import models
from .user import User

class LogAccess(models.Model):
    ideLogAccess = models.BigAutoField(primary_key=True)
    strAddress = models.TextField()
    strEmail = models.EmailField(null=True, blank=True)
    strResult = models.TextField()
    ideUser = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    timeStamp = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'tblLogAccess'
    
    def __str__(self):
        return self.ideLogAccess
