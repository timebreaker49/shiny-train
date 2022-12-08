from rest_framework import serializers
from .models import Quote
from taggit.serializers import (TagListSerializerField, TaggitSerializer)

class QuoteSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    
    class Meta:
        model = Quote
        fields = ('id', 'quote', 'author', 'tags')