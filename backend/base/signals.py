from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import CustomUser  # Import your custom user model


@receiver(pre_save, sender=CustomUser)
def updateUser(sender, instance, **kwargs):
    # print("Signal Triggered")
    if instance.email:
        instance.name = instance.email
