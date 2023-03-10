from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _
from .model_manager import UserManager

class User(AbstractUser):
    username = models.CharField(max_length=20, unique=True, blank=False, null=False)
    email = models.EmailField(_('email address'), unique=True)
    job = models.CharField(max_length=30, blank=True, null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','job']
    
    objects = UserManager()
    
    def __str__(self):
        return self.email
    
    
    