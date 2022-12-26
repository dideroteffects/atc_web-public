from django.urls import path, include
from .views import NoteView, NoteCreate

urlpatterns = [
    path('list', NoteView.as_view()),
    path('create', NoteCreate.as_view()),
]
