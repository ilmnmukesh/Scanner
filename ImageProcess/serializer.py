from rest_framework.serializers import ModelSerializer,Serializer, FileField, DateField, ImageField
from .models import ScanningImage
class ImageRequestSerializer(ModelSerializer):
    image = FileField(allow_empty_file=True)
    xml   = FileField(allow_empty_file=True)
    class Meta:
        fields=[
            "image",
            "xml"
        ]
        model =ScanningImage

    def create(self, validated_data):
        return ScanningImage.objects.create(name=validated_data.get("image").name)

class ReportSerializer(Serializer):
    start_date  = DateField()
    end_date    = DateField()