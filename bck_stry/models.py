from django.db import models
from bck_accnt.models import User
from django.utils.translation import gettext as _

class Note(models.Model):
    title = models.CharField(max_length=60, null=False, blank=False)
    body = models.CharField(max_length=400, null=False, blank=False)
    heart = models.PositiveIntegerField(null=False, blank=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    writer = models.ForeignKey(User, on_delete=models.CASCADE, db_column="id")
    # remote_addr = models.GenericIPAddressField(blank=True, null=True, verbose_name=_("remote address"))

    def __str__(self):
        return self.title
    