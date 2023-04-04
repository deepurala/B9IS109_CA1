from django.db import models
from django.urls import reverse

class companyCRUD (models.Model):
    name = models.CharField(max_length=200, blank = True)
    industry = models.CharField(max_length=200, blank = True)
    location = models.CharField(max_length=200, blank = True)
    linkedIn = models.CharField(max_length=200, blank = True)
    is_active = models.BooleanField(default=True)
    
    
    def __str__(self):
        return self.name