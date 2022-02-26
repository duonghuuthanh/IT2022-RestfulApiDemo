from django.contrib import admin
from .models import User, Category, Course


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'active', 'created_date')
    list_filter = ('id', 'name', 'created_date')
    search_fields = ('id', 'name')


admin.site.register(User)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Course)
