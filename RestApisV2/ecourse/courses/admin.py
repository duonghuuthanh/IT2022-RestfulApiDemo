from django.contrib import admin
from django.db.models import Count
from django.template.response import TemplateResponse
from .models import User, Category, Course, Lesson, Tag, Comment
from django.utils.html import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.urls import path


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'active', 'created_date')
    list_filter = ('id', 'name', 'created_date')
    search_fields = ('id', 'name')


class CourseForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Course
        fields = '__all__'


class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'subject', 'created_date')
    readonly_fields = ['image_view']
    form = CourseForm

    def image_view(self, course):
        return mark_safe(
            "<img src='/static/{url}' alt='test' width='120' />".format(url=course.image.name)
        )

    def get_urls(self):
        return [
                   path('category-stats/', self.stats_view)
               ] + super().get_urls()

    def stats_view(self, request):
        count = Category.objects.count()
        stats = Category.objects.annotate(course_counter=Count('courses')).values('id', 'name', 'course_counter')

        return TemplateResponse(request, 'admin/categories-stats.html', {
            'count': count,
            'stats': stats
        })


admin.site.register(User)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson)
admin.site.register(Tag)
admin.site.register(Comment)