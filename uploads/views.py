from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
import uuid
import os

class UploadView(View):
    def post(self, request):
        campos = ['product', 'customer', 'unit_product', 'sale', 'stock', 'seller', 'order', 'sellers_portfolio']
        recebidos = {}
        remove_and_replace = '.csv'

        dir_name = f"dir-{uuid.uuid4()}"

        os.mkdir(f"media/{dir_name}")

        for campo in campos:
            arquivos = request.FILES.getlist(campo)
            recebidos[campo] = [file.name for file in arquivos]

            for file in arquivos:
                with open(f'media/{dir_name}/{file.name.replace(remove_and_replace, "")}-{uuid.uuid4()}{remove_and_replace}', 'wb+') as dest:
                    for chunk in file.chunks():
                        dest.write(chunk)

        return JsonResponse({'status': 'OK', 'arquivos': recebidos})