from django.urls import path
from .views import BlogPostListView

urlpatterns = [
    path('blog/', BlogPostListView.as_view(), name='blog-list'),
]
