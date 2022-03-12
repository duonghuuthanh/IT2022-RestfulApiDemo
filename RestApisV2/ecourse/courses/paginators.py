from rest_framework import pagination


class CoursePaginator(pagination.PageNumberPagination):
    page_size = 2
    page_query_param = 'page'
