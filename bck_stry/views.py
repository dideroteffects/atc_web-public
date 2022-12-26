from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from django.http import HttpResponse
from .models import Note
from .serializers import NoteSerializer

class NoteView(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
class NoteCreate(generics.CreateAPIView):
    serializer_class = NoteSerializer
    pass
    # def post(self, request, *args, **kwargs):
    #     cli = request.session
    #     serializer = self.serializer_class(data=cli)
    #     return super().post(request, *args, **kwargs)