from django.urls import path, include
from .views import NoteView, NoteCreate, NoteDelete, NoteUpdate, NoteDetail

urlpatterns = [
    path('list/', NoteView.as_view()),
    path('detail/<noteid>', NoteDetail.as_view()),
    path('create/', NoteCreate.as_view()),
    path('delete/<noteid>', NoteDelete.as_view()),
    path('update/<noteid>', NoteUpdate.as_view()),
]
