from django.urls import path
from .views import CreatePostView, BlogPostListView, PostDetailView

urlpatterns = [
    path('', BlogPostListView.as_view(), name='blog-list'),
    path('create/', CreatePostView.as_view(), name='create-post'),
    path('<int:pk>/', PostDetailView.as_view(), name='post-detail'),
]


