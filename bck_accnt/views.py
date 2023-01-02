from django.shortcuts import render
from django.contrib.auth import login as django_login, logout as djnago_logout
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from rest_framework import viewsets

class UserDetail(APIView):
    serializer_class = UserSerializer
    def get(self, request, format=None):
        if self.request.session.exists:
            activesession_id = self.request.session.get('_auth_user_id')
            if activesession_id:
                user = User.objects.filter(id= int(activesession_id))
            else:
                return Response({'message':"User doesn't logged in"},status=status.HTTP_200_OK)
            if len(user) > 0:
                data = UserSerializer(user[0]).data
                return Response(data=data, status=status.HTTP_200_OK)

            return Response({'err-message':'this have a session but not valid'},status=status.HTTP_403_FORBIDDEN)
        else:
            
            return Response({'message':"User doesn't have session"},status=status.HTTP_200_OK)
    
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
            return Response({'message':"User doesn't have session"},status=status.HTTP_200_OK)
        

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

class google_login(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = 'http://127.0.0.1:8000/dj-rest-auth/google/callback'
    client_class = OAuth2Client

def google_callback(request):
    pass
 

def google_login_success(request):
    pass