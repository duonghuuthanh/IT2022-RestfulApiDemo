from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField


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

    def __str__(self):
        return self.name


class Course(ModelBase):
    subject = models.CharField(max_length=255)
    description = RichTextField()
    image = models.ImageField(null=True, blank=True, upload_to='courses/%Y/%m')
    category = models.ForeignKey(Category, related_name="courses", null=True, on_delete=models.SET_NULL)

    class Meta:
        unique_together = ('subject', 'category')

    def __str__(self):
        return self.subject