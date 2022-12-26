from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse

def temp(request):
    return HttpResponse('hello')