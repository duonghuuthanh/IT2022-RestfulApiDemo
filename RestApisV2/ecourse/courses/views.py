from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Course
from .serializers import CategorySerializer, CourseSerializer, LessonSerializer
from .paginators import CoursePaginator


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.filter(active=True)
    serializer_class = CategorySerializer

    def get_queryset(self):
        query = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            query = query.filter(name__icontains=kw)

        return query


class CourseViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Course.objects.filter(active=True)
    serializer_class = CourseSerializer
    pagination_class = CoursePaginator

    def get_queryset(self):
        query = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            query = query.filter(subject__icontains=kw)

        cate_id = self.request.query_params.get('category_id')
        if cate_id:
            query = query.filter(category_id=cate_id)

        return query

    @action(methods=['get'], detail=True, url_path='lessons')
    def get_lessons(self, request, pk):
        # c = Course.objects.get(pk=pk)
        lessons = self.get_object().lessons

        return Response(data=LessonSerializer(lessons, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

