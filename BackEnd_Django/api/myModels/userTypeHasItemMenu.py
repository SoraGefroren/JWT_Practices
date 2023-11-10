from django.db import models
from .userType import UserType
from .itemMenu import ItemMenu

class UserTypeHasItemMenu(models.Model):
    ideUserTypeHasItemMenu = models.AutoField(primary_key=True)
    ideUserType = models.ForeignKey(UserType, on_delete=models.CASCADE)
    ideItemMenu = models.ForeignKey(ItemMenu, on_delete=models.CASCADE)
    timeStamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'tblUserTypeHasItemMenu'
        # managed = False  # Para desactivar la creación de migraciones y la administración de la tabla

    def __str__(self):
        return f'{self.ideUserType} - {self.ideItemMenu}'
