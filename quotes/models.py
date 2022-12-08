from django.db import models

from taggit.managers import TaggableManager

class Category(models.Model):
    name = models.CharField(max_length=255)
    quotes = models.ManyToManyField('Quote', related_name='quotes')
    
    def __str__(self):
        return self.name
    
class Quote(models.Model):
    quote = models.TextField()
    author = models.CharField(max_length=255, default='Unknown')
    
    tags = TaggableManager()
    
    def __str__(self):
        return self.quote
    
    
