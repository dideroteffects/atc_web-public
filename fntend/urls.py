from django.urls import path, include
from .views import index, account
urlpatterns = [
    path('', index),
    path('atcstory/', index),
    path('memstory/', index),
    path('memstory/create/', index),
    path('memstory/detail', index),
    path('memstory/edit', index),
    path('memstory/delete', index),
    path('me/', account),
    path('me/login/', account),
    path('me/logout/', account),
    path('me/signup/', account),
]
