from django.db import models
from bck_accnt.models import User
from django.utils.translation import gettext as _
import string
import random

def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Note.objects.filter(code=code).count() == 0:
            break
    return code

class Note(models.Model):
    code = models.CharField(max_length=6, default=generate_unique_code, unique=True)
    title = models.CharField(max_length=60, null=False, blank=False)
    body = models.CharField(max_length=400, null=False, blank=False)
    heart = models.PositiveIntegerField(null=False, blank=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    writer = models.ForeignKey(User, on_delete=models.CASCADE, db_column="id")
    # remote_addr = models.GenericIPAddressField(blank=True, null=True, verbose_name=_("remote address"))

    def __str__(self):
        return self.title
    