from .models import Category, Course, Lesson
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        exclude = ['active']


class CourseSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')

    def get_image(self, obj):
        request = self.context['request']
        if obj.image and not obj.image.name.startswith('/static'):
            path = '/static/%s' % obj.image.name

            return request.build_absolute_uri(path)

    class Meta:
        model = Course
        fields = ['id', 'subject', 'image', 'created_date', 'category_id']


class LessonSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')

    def get_image(self, obj):
        request = self.context['request']
        if obj.image and not obj.image.name.startswith('/static'):
            path = '/static/%s' % obj.image.name

            return request.build_absolute_uri(path)

    class Meta:
        model = Lesson
        fields = ['id', 'subject', 'image', 'course_id']

