from django.db import models
from .translation import Translation

class Language(models.Model):
    ideLanguage = models.CharField(max_length=255, primary_key=True)
    strLanguage = models.CharField(max_length=255)
    ideTranslation = models.ForeignKey(Translation, on_delete=models.SET_NULL, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'tblLanguage'

    def __str__(self):
        return self.strLanguage
