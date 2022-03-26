from .models import Category, Course, Lesson, Tag, Comment, User
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


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class LessonSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')
    tags = TagSerializer(many=True)

    def get_image(self, obj):
        request = self.context['request']
        if obj.image and not obj.image.name.startswith('/static'):
            path = '/static/%s' % obj.image.name

            return request.build_absolute_uri(path)

    class Meta:
        model = Lesson
        fields = ['id', 'subject', 'image', 'created_date', 'updated_date', 'course_id', 'tags']


class LessonDetailSerializer(LessonSerializer):
    like = serializers.SerializerMethodField()

    def get_like(self, obj):
        request = self.context['request']
        if request.user.is_authenticated:
            return obj.like_set.filter(user=request.user, active=True).exists()

    class Meta:
        model = LessonSerializer.Meta.model
        fields = LessonSerializer.Meta.fields + ['content', 'like']


class UserSerializer(serializers.ModelSerializer):
    avatar_path = serializers.SerializerMethodField(source='avatar')

    def get_avatar_path(self, obj):
        request = self.context['request']
        if obj.avatar and not obj.avatar.name.startswith('/static'):
            path = '/static/%s' % obj.avatar.name

            return request.build_absolute_uri(path)

    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name', 'email', 'avatar', 'avatar_path']
        extra_kwargs = {
            'password': {
                'write_only': True
            }, 'avatar_path': {
                'read_only': True
            }, 'avatar': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        data = validated_data.copy()

        u = User(**data)
        u.set_password(u.password)
        u.save()

        return u


class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content', 'lesson', 'user']


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date', 'updated_date', 'user']




