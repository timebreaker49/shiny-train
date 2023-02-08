from rest_framework import serializers
from .models import Quote
from taggit.serializers import (TagListSerializerField, TaggitSerializer)
from taggit.models import Tag


class QuoteSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Quote
        fields = ('id', 'quote', 'author', 'tags')


class MyTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'slug']