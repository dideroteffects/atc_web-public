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
    def get(self, request):
        return Response(NoteSerializer(Note.objects.all(), many=True).data, status=status.HTTP_200_OK)
    
class NoteDetail(APIView):
    
    def post(self, request, noteid, format=None):
        
        if noteid!=None:
            note_result = Note.objects.filter(id = noteid)
            # print(note_result)
            if len(note_result)>0:
                note = note_result[0]
            else:return Response({'message':'it is not valid story id'},status=status.HTTP_403_FORBIDDEN)
        else:return Response({'message':'fill the story id'},status=status.HTTP_400_BAD_REQUEST)
        return Response(NoteSerializer(note).data, status=status.HTTP_200_OK)
    
class NoteCreate(generics.CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteCreateSerializer
    def get(self, request):
        return Response(NoteCreateSerializer(Note.objects.all(),many=True).data, status=status.HTTP_200_OK)
    def post(self, request, *args, **kwargs):
        if not self.request.session.exists(self.request.session.session_key):
            return Response({'message':'please LOGIN'},status=status.HTTP_403_FORBIDDEN)
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
                return Response({'message':'you write two posts of duplication title'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
            else:
                
                note = Note(writer=writer, title=title, body=body)
                note.save()
                return Response(NoteCreateSerializer(note).data, status=status.HTTP_200_OK)
        return Response({'message':'you send wrong data please fill title and body'}, status=status.HTTP_400_BAD_REQUEST)

class NoteDelete(APIView):
    
    def post(self, request, noteid, format=None):
        if noteid!=None:
            note_result = Note.objects.filter(id = noteid)
            if len(note_result)>0:
                note = note_result[0]
                note.delete()
            else:return Response({'message':'it is not valid story id'},status=status.HTTP_403_FORBIDDEN)
        else:return Response({'message':'fill the story id'},status=status.HTTP_400_BAD_REQUEST)
        return Response({'Message':'success deleted'}, status=status.HTTP_200_OK)
    
class NoteUpdate(generics.UpdateAPIView):
    pass