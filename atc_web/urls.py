
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('fnt/', include('fntend.urls')),
    path('dj-rest-auth/', include('bck_accnt.urls')),
    # path('api/accounts/v1/', include('bck_accnt.urls')),
    # path('api/v1/rest-auth/', include('bck_accnt.urls')),
]
