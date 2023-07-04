from django.db import models
from django.utils import timezone
from PIL import Image

from account.models import User


# Create your models here.
class Item(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True)
    # image = models.ImageField(upload_to="images/", blank=True, null=True)
    created_date = models.DateTimeField(default=timezone.now)
    updated_date = models.DateTimeField(auto_now=True)
    # author = models.ForeignKey(User, on_delete=models.CASCADE)

    # comment: User Profile Image resize Function
    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)
    #     img = Image.open(self.image.path)
    #     if img.height > 600 or img.width > 600:
    #         output_size = (400, 400)
    #         img.thumbnail(size=output_size)
    #         img.save(self.image.path)
