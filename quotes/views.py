from django.shortcuts import get_object_or_404
from django.core import serializers
from django.http import HttpResponse
from django.views import generic
from django.views.decorators.csrf import csrf_exempt
from .models import Category, Quote
from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from .serializers import QuoteSerializer, MyTagSerializer
from .authentication import CsrfExemptSessionAuthentication, BasicAuthentication
from taggit.models import Tag
from taggit.serializers import (TagListSerializerField, TaggitSerializer)


# Create your views here.


def add_to_category(request, quote_id):
    quote = get_object_or_404(Quote, pk=quote_id)
    return HttpResponse("quote: %s" % quote)


class IndexView(generic.ListView):
    template_name = 'quotes/index.html'
    context_object_name = 'categories'

    def get_queryset(self):
        """Return 5 categories in alphabetical order"""
        return Category.objects.order_by('-name')[:5]


class DetailView(generic.DetailView):
    model = Category
    template_name = 'quotes/detail.html'


class QuoteViewSet(viewsets.ModelViewSet):
    serializer_class = QuoteSerializer
    queryset = Quote.objects.all()
    # Temporary solution to prevent csrf checks during API requests
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    @api_view(['POST'])
    @csrf_exempt
    def filter_for_tags(request):
        params = request.data['tags']
        quotes = Quote.objects.filter(tags__name__in=params).distinct()
        serializer = QuoteSerializer(quotes, many=True)
        return Response(serializer.data, status=200)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.exclude(quote=None).order_by('name')
    serializer_class = MyTagSerializer
