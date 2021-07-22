from django.db import models

class ScanningObject(models.Model):
    id      = models.BigAutoField(primary_key=True)
    name    = models.CharField(max_length=50)
    xmin    = models.IntegerField()
    xmax    = models.IntegerField()
    ymin    = models.IntegerField()
    ymax    = models.IntegerField()
    image   = models.ForeignKey("ScanningImage", on_delete= models.CASCADE)

    def __str__(self) -> str:
        return self.name

class ScanningImage(models.Model):
    id              = models.BigAutoField(primary_key=True)
    name            = models.CharField(max_length=50)
    timestamp       = models.DateTimeField(auto_now=True, auto_created=True)

    def __str__(self) -> str:
        return self.name