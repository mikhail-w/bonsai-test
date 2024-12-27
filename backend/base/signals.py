from django.db.models.signals import pre_save
from django.contrib.auth.models import User
from django.dispatch import receiver


@receiver(pre_save, sender=User)
def updateUser(sender, instance, **kwargs):
    """
    Automatically update the username to match the email before saving a User instance.
    """
    if instance.email:
        instance.username = instance.email
