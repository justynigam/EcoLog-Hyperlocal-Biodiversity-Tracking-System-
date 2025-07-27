from email.policy import default
from django.db import models

class Observation(models.Model):
  user_id = models.CharField(max_length=255 , default='anonymous')
  species_name = models.CharField(max_length=255)
  photo = models.ImageField(upload_to='observations/', blank=True , null=True)
  latitude = models.DecimalField(max_digits=9 , decimal_places=7)
  longitude = models.DecimalField(max_digits=9 , decimal_places=7)
  notes = models.TextField(blank=True , null=True)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"{self.species_name} by {self.user_id} at ({self.latitude} , {self.longitude})"