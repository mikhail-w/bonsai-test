from django.core.management.base import BaseCommand
from base.models import Product


class Command(BaseCommand):
    help = "Update image paths from static/images/ to media/products/"

    def handle(self, *args, **kwargs):
        # Update the image paths for all products
        for product in Product.objects.all():
            if product.image:  # Check if the product has an image
                if product.image.name.startswith("static/images/"):
                    new_path = product.image.name.replace(
                        "static/images/", "media/products/"
                    )
                    product.image.name = new_path
                    product.save()
        self.stdout.write(self.style.SUCCESS("Successfully updated image paths"))
