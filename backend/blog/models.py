from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Use the User model directly
    content = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='posts/images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)  # Reference User directly in ManyToManyField
    views = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'{self.user.username} - {self.content[:20]}'


