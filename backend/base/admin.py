from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User  # Import the default User model
from django.utils.html import format_html

from .models import UserProfile, Product, Review, Order, OrderItem, ShippingAddress


# UserProfile Inline in UserAdmin
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = "User Profiles"


# Customized User Admin with UserProfile Inline
class CustomizedUserAdmin(UserAdmin):
    inlines = (UserProfileInline,)


# Unregister the default User admin and register the customized one
admin.site.unregister(User)
admin.site.register(User, CustomizedUserAdmin)


# Product admin with image preview
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "get_image_preview")
    readonly_fields = ("get_image_preview",)

    def get_image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="50" style="border-radius: 5px;" />',
                obj.get_image_url(),
            )
        return "No Image"

    get_image_preview.short_description = "Image Preview"


# Register other models
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
