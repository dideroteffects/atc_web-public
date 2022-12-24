from django.shortcuts import render

def index(request):
    return render(request, 'fntend/index.html')

def account(request):
    return render(request, 'fntend/account.html')