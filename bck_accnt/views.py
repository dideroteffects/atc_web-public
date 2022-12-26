from django.shortcuts import render
from django.contrib.auth import login as django_login, logout as djnago_logout
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from rest_framework import viewsets

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserSessionCheck(APIView):
    def get(self, request, format=None):
        data = self.request.session
        return Response(data=data,status=status.HTTP_200_OK)
    def post(self, request, format=None):
        if self.request.session.exists:
            data = self.request.session
            return Response(data=data,status=status.HTTP_200_OK)
        else:
            return Response({'st':"User doesn't have session"},status=status.HTTP_200_OK)