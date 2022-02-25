from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


class ModelBase(models.Model):
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(ModelBase):
    name = models.CharField(max_length=50, unique=True)
