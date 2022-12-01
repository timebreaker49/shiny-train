from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.views import generic
from .models import Category, Quote
from rest_framework import viewsets
from .serializers import QuoteSerializer
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
    
class QuoteView(viewsets.ModelViewSet):
    serializer_class = QuoteSerializer
    queryset = Quote.objects.all()
