from rest_framework import permissions


class CommentOwnerPermisson(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, comment):
        return request.user == comment.user