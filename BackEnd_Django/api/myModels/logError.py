from django.db import models
from .user import User

class LogError(models.Model):
    ideLogError = models.BigAutoField(primary_key=True)
    strAddress = models.TextField()
    strAppOrigin = models.CharField(max_length=255)
    strParameters = models.TextField()
    strError = models.TextField()
    ideUser = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    timeStamp = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'tblLogError'
    
    def __str__(self):
        return self.ideLogError
