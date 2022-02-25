from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello World!!!")


def test(request, year):
    return render(request, 'index.html', {
        'name': 'Thanh - %d' % year
    })
