import os
from django.shortcuts import render


def index(request):
    context = {"title": "Validação de Arquivos", "lang": "pt-br"}
    return render(request, 'index.html', context)


