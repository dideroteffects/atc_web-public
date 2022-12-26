from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from django.http import HttpResponse
from .models import Note
from .serializers import NoteSerializer

def temp(request):
    return HttpResponse('hello')

class NoteView(generics.RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer