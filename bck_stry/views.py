from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, status
from .models import Note
from bck_accnt.models import User
from django.db.models import Q
from .serializers import NoteSerializer, NoteCreateSerializer

class NoteView(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
class NoteCreate(generics.CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteCreateSerializer
    def get(self, request):
        return Response(NoteCreateSerializer(Note.objects.all(),many=True).data, status=status.HTTP_200_OK)
    def post(self, request, *args, **kwargs):
        if not self.request.session.exists(self.request.session.session_key):
            return Response({'message':'please LOGIN'},status=status.HTTP_200_OK)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            title = serializer.data.get('title')
            body = serializer.data.get('body')
            writer = User(id=self.request.session.get('_auth_user_id'))
            q = Q()
            q.add(Q(writer = writer),q.AND)
            q.add(Q(title = title),q.AND)
            queryset = Note.objects.filter( q )
            if queryset.exists():
                return Response({'message':'you write two posts of duplication title'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                
                note = Note(writer=writer, title=title, body=body)
                note.save()
                return Response(NoteCreateSerializer(note).data, status=status.HTTP_200_OK)
        return Response({'message':'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)
        