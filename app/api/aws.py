import boto3
import botocore
import os
import uuid

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION=os.environ.get("AWS_DOMAIN")
ALLOWED_EXTENSIONS={"pdf", "png", "jpg", "jpeg", "gif", "mp4", "mkv"}

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)

#check if the filename is in allowed format
def allowed_file(filename):
    return "." in filename and \
        filename.rsplit(".", 1)[1].lower in ALLOWED_EXTENSIONS