from django.urls import path
from .views import CreatePostView, BlogPostListView, PostDetailView, PostLikeUnlikeView, CommentCreateView, PostCommentsListView, PostDeleteView

urlpatterns = [
    path('', BlogPostListView.as_view(), name='blog-list'),
    path('create/', CreatePostView.as_view(), name='create-post'),
    path('<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('<int:pk>/like/', PostLikeUnlikeView.as_view(), name='post-like-unlike'),
    path('<int:post_id>/comment/', CommentCreateView.as_view(), name='post-comment'),
    path('<int:post_id>/comments/', PostCommentsListView.as_view(), name='post-comments'),
    path('<int:pk>/delete/', PostDeleteView.as_view(), name='post-delete'),

]
