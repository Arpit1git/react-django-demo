from django.db import models
from django.core.validators import MaxValueValidator
from django.contrib.auth.models import User
# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10,
                                decimal_places=2,
                                validators=[MaxValueValidator(100000.00)])
    owner = models.ForeignKey(User, on_delete=models.CASCADE)


    def __str__(self):
        return f"{self.name} added, price: {self.price}"

    