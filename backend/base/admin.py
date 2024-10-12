from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *
from .models import UserProfile

# Register your models here.


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = "UserProfiles"


class CustomizedUserAdmin(UserAdmin):
    inlines = (UserProfileInline,)


admin.site.unregister(User)
admin.site.register(User, CustomizedUserAdmin)


# Product admin with image preview
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "get_image_preview")

    def get_image_preview(self, obj):
        return f'<img src="{obj.get_image_url(obj)}" width="50" />'

    get_image_preview.allow_tags = True
    get_image_preview.short_description = "Image"


admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
