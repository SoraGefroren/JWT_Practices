from django.db import models

class Translation(models.Model):
    ideTranslation = models.BigAutoField(primary_key=True)
    strTranslation = models.TextField(unique=True)
    strLabelKey = models.CharField(max_length=255, unique=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'tblTranslation'
    
    def __str__(self):
        return self.strLabelKey
