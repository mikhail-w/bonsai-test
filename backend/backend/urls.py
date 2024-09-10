from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

# from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/products/", include("base.urls.product_urls")),
    path("api/users/", include("base.urls.user_urls")),
    path("api/orders/", include("base.urls.order_urls")),
    path("api/blog/", include("blog.urls")),
    path("api/chatbot/", include("chatbot.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
