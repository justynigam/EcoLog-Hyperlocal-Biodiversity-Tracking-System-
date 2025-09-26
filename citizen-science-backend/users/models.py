from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """Extended user model with additional profile fields"""
    display_name = models.CharField(max_length=100, blank=True, null=True)
    avatar_url = models.URLField(blank=True, null=True)
    score = models.IntegerField(default=0)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    
    # Statistics
    total_observations = models.IntegerField(default=0)
    species_discovered = models.IntegerField(default=0)
    
    def __str__(self):
        return self.username or self.email
