from django.db import models
from .translation import Translation

class ItemMenu(models.Model):
    ideItemMenu = models.BigAutoField(primary_key=True)
    strLink = models.TextField()
    ideTranslation = models.ForeignKey(Translation, on_delete=models.SET_NULL, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'tblItemMenu'

    def __str__(self):
        return self.strLink
