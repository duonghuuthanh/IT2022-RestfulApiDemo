
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='course-index'),
    path('test/', views.test, name='course-test'),
]