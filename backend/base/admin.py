from django.contrib import admin
from .models import *
from .models import UserProfile
from django.contrib.auth.admin import UserAdmin

# Register your models here.


# admin.site.register(UserProfile)
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = "UserProfiles"


class CustomizedUserAdmin(UserAdmin):
    inlines = (UserProfileInline,)


admin.site.unregister(User)
admin.site.register(User, CustomizedUserAdmin)
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
