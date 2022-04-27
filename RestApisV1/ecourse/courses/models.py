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


class CVOnline(ModelBase):
    intro = RichTextField()
    from_salary = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    to_salary = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)


class Category(ModelBase):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Course(ModelBase):
    subject = models.CharField(max_length=255, null=False)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to='courses/%Y/%m')
    category = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL)
    pre_courses = models.ManyToManyField('self', null=True, symmetrical=False)

    def __str__(self):
        return self.subject

    class Meta:
        unique_together = ('subject', 'category')


class Lesson(ModelBase):
    subject = models.CharField(max_length=255)
    content = RichTextField()
    image = models.ImageField(null=True, upload_to='lessons/%Y/%m')
    course = models.ForeignKey(Course,
                               related_name='lessons',
                               related_query_name='my_lesson',
                               on_delete=models.CASCADE)
    tags = models.ManyToManyField('Tag')
    viewers = models.ManyToManyField(User, through='UserLessonView')

    def __str__(self):
        return self.subject


class UserLessonView(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    counter = models.IntegerField(default=0)
    reading_date = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'lesson')


class Comment(ModelBase):
    content = models.TextField()
    lesson = models.ForeignKey(Lesson,
                               related_name='comments',
                               on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.content


class Tag(ModelBase):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class ActionBase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'lesson')
        abstract = True


class Like(ActionBase):
    active = models.BooleanField(default=False)


class Rating(ActionBase):
    rate = models.SmallIntegerField(default=0)
