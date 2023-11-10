from rest_framework import viewsets

from rest_framework import serializers
from myModels.translation import Translation

class Serialize (serializers.ModelSerializer):
    class Meta:
        model = Translation
        fields = '__all__' # ('Campo_1', 'Campo_2')

class ViewSet(viewsets.ModelViewSet):
    queryset = Translation.objects.all()
    serializer_class = Serialize
