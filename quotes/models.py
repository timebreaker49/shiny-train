from django.db import models

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quotesdjango.settings')
django.setup()

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

    @classmethod
    def create_quote_from_script(cls, quote, author):
        quote = cls.objects.create(quote=quote, author=author)
        if quote.quote is not None and quote.author is not None:
            quote.save()
        return quote
