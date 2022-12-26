from django.urls import path, include
from .views import temp, NoteView

urlpatterns = [
    path('dhttp', temp),
    path('generic', NoteView.as_view()),
]
