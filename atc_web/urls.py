
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('fnt/', include('fntend.urls')),
    path('bck_accnt/', include('bck_accnt.urls')),
]
