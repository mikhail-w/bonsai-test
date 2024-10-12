from django.core.management.base import BaseCommand
from base.models import Product


class Command(BaseCommand):
    help = "Update image paths from static/images/ to media/products/"

    def handle(self, *args, **kwargs):
        # Update the image paths for all products
        for product in Product.objects.all():
            if product.image:  # Check if the product has an image
                if product.image.name.startswith("media/products/"):
                    new_path = product.image.name.replace(
                        "media/products/", "products/"
                    )
                    product.image.name = new_path
                    product.save()
        self.stdout.write(self.style.SUCCESS("Successfully updated image paths"))
