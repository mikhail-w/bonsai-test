from django.apps import AppConfig


class BaseConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "base"

    def ready(self):
        # Import signals only when the app is ready to avoid circular imports
        try:
            import base.signals
        except ImportError as e:
            raise ImportError(f"Failed to import signals: {e}")
