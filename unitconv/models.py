from django.db import models

# Create your models here.
class Conversion(models.Model):
    unit = models.CharField(max_length=10)
    conversion = models.FloatField()