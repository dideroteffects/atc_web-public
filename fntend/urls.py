from django.urls import path, include
from .views import index, account
urlpatterns = [
    path('', index),
    path('atcstory/', index),
    path('memstory/', index),
    path('me/', account),
]
