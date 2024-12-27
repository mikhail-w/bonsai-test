from storages.backends.s3boto3 import S3Boto3Storage


class StaticStorage(S3Boto3Storage):
    # Files uploaded using this backend will be stored in the 'static/' folder
    location = "static"


class MediaStorage(S3Boto3Storage):
    # Files uploaded using this backend will be stored in the 'media/' folder
    location = "media"
