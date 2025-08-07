from django.db import models
import uuid

# Create your models here.


class LayoutModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name_layout = models.CharField(max_length=255)
    name_file_layout = models.CharField(max_length=255)
    extension_file_layout = models.CharField(max_length=10)

    def __str__(self):
        return self.name_layout
