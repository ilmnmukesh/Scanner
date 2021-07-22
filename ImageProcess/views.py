from ImageProcess.models import ScanningImage, ScanningObject
from ImageProcess.serializer import ImageRequestSerializer, ReportSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http.response import HttpResponse

import json, base64, xmltodict, csv
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
from Scanner.settings import BASE_DIR
from django.core.files.storage import FileSystemStorage

class ImageScanner:
    def __init__(self,obj, image, xml) -> None:
        self.img  		= Image.open(image)
        self.obj		= obj
        self.xml  		= json.loads(json.dumps(xmltodict.parse(xml)))
        self.fontSize 	= 32
        self.color      = "hsl(336, 100%, 50%)"
        self.font 		= ImageFont.truetype(BASE_DIR+r"\Design\static\font\Roboto-Medium.ttf", self.fontSize)
        self.draw		= ImageDraw.Draw(self.img)
        self.main()

    def main(self):
        data= self.xml["annotation"]["object"]
        if type(data) == dict:
            xmin=int(data["bndbox"]["xmin"])
            ymin=int(data["bndbox"]["ymin"])
            xmax=int(data["bndbox"]["xmax"])
            ymax=int(data["bndbox"]["ymax"])
            self.draw.rectangle([(xmin,ymin),(xmax,ymax)],outline=self.color, width=3)
            self.draw.text((xmin, ymin-self.fontSize),data["name"], fill=self.color, font=self.font)			
            ScanningObject.objects.create(xmax=xmax, xmin=xmin, ymin=ymin, ymax=ymax, name=data["name"], image=self.obj)
        else:
            for obj in data:
                xmin=int(obj["bndbox"]["xmin"])
                ymin=int(obj["bndbox"]["ymin"])
                xmax=int(obj["bndbox"]["xmax"])
                ymax=int(obj["bndbox"]["ymax"])
                self.draw.rectangle([(xmin,ymin),(xmax,ymax)],outline=self.color, width=3)
                self.draw.text((xmin, ymin-self.fontSize),obj["name"], fill=self.color, font=self.font)			
                ScanningObject.objects.create(xmax=xmax, xmin=xmin, ymin=ymin, ymax=ymax, name=obj["name"],  image=self.obj)
    def save(self,type=1):
        if type==1:
            buffered = BytesIO()
            self.img.save(buffered, format="JPEG")
            img_str = base64.b64encode(buffered.getvalue()).decode('ascii')
            return img_str
        else:
            buffered = BytesIO()
            self.img.save(buffered, format="JPEG")
            fs= FileSystemStorage("media/")
            file=fs.save("process/"+self.xml["annotation"]["filename"],buffered)
            return fs.url(file)
        
@api_view(["POST"])
def base64Process(request):
    ser= ImageRequestSerializer(data=request.data)
    data={"success":False}
    if ser.is_valid():
        obj=ser.create(ser.validated_data)
        imgsc=ImageScanner(obj=obj,**ser.validated_data)
        data["success"]=True
        data["base64data"]=imgsc.save()
    else:
        data["errors"]=ser.errors
    return Response(data)

@api_view(["POST"])
def saveServerProcess(request):
    ser= ImageRequestSerializer(data=request.data)
    data={"success":False}
    if ser.is_valid():
        obj = ser.create(ser.validated_data)
        imgsc=ImageScanner(obj=obj, **ser.validated_data)
        data["success"]=True
        data["url"]=imgsc.save(2)
    else:
        data["errors"]=ser.errors
    return Response(data)

@api_view(['GET'])
def report(request):
    ser = ReportSerializer(data=request.GET)
    if ser.is_valid():
        start, end=ser.validated_data["start_date"], ser.validated_data["end_date"]
        query = ScanningImage.objects.filter(timestamp__date__gte=start,timestamp__date__lte= end)
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="%s__%s.csv"'%(start, end)
        writer = csv.DictWriter(response, fieldnames=['image_name', 'object_name', "x_min","y_min", "x_max", "y_max", "timestamp"])
        writer.writeheader()
        for obj in query:
            for nest in obj.scanningobject_set.all():
                writer.writerow({
                    'image_name':obj.name, 
                    'object_name':nest.name, 
                    "x_min":nest.xmin,
                    "y_min":nest.ymin,
                    "x_max":nest.xmax,
                    "y_max":nest.ymax,
                    "timestamp":obj.timestamp
                })
        return response
    else:
        return Response(ser.errors)
    