from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField


class User(AbstractUser):
    avatar = models.ImageField(null=True, upload_to='users/%Y/%m')


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


class Lesson(ModelBase):
    subject = models.CharField(max_length=255)
    content = RichTextField()
    image = models.ImageField(null=True, upload_to='lessons/%Y/%m')
    course = models.ForeignKey(Course,
                               related_name='lessons',
                               related_query_name='my_lesson',
                               on_delete=models.CASCADE)
    tags = models.ManyToManyField('Tag')

    def __str__(self):
        return self.subject


class Tag(ModelBase):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Comment(ModelBase):
    content = models.CharField(max_length=255)
    lesson = models.ForeignKey(Lesson, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.content


class ActionBase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)

    class Meta:
        abstract = True
        unique_together = ('user', 'lesson')


class Like(ActionBase):
    active = models.BooleanField(default=False)


class Rating(ActionBase):
    rate = models.SmallIntegerField(default=0)
