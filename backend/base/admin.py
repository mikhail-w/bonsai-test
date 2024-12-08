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
    extra = 0  # Prevent additional empty inline forms


# Customized User Admin with UserProfile Inline
class CustomizedUserAdmin(UserAdmin):
    inlines = (UserProfileInline,)


# Unregister the default User admin and register the customized one
admin.site.unregister(User)
admin.site.register(User, CustomizedUserAdmin)


# Product admin with image preview
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "countInStock", "get_image_preview")
    readonly_fields = ("get_image_preview",)
    search_fields = ("name", "category")
    list_filter = ("category", "price")
    ordering = ("-createdAt",)

    def get_image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="50" style="border-radius: 5px;" />',
                obj.image.url,  # Ensure `image.url` is correctly set up
            )
        return "No Image"

    get_image_preview.short_description = "Image Preview"


# Review admin
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("product", "user", "rating", "createdAt")
    search_fields = ("product__name", "user__username", "rating")
    list_filter = ("rating", "createdAt")
    ordering = ("-createdAt",)


# Order admin
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("_id", "user", "totalPrice", "isPaid", "isDelivered", "createdAt")
    search_fields = ("user__username", "_id")
    list_filter = ("isPaid", "isDelivered", "createdAt")
    ordering = ("-createdAt",)


# OrderItem admin
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("name", "order", "qty", "price")
    search_fields = ("name", "order__id")
    list_filter = ("order",)


# ShippingAddress admin
@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ("order", "address", "city", "postalCode", "country")
    search_fields = ("order__id", "address", "city", "postalCode", "country")
    list_filter = ("country",)
