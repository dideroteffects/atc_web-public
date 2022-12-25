from django.shortcuts import render
from django.contrib.auth import login as django_login, logout as djnago_logout
from rest_framework.views import APIView
# from rest_framework.authtoken.models import Token
from .models import User

# token = Token.objects.all()

# class LogoutView(APIView):
#     def post(self, request, *args, **kwargs):
#         return self.logout(request)