from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from quotes import views


router = routers.DefaultRouter()
router.register(r'quotes', views.QuoteViewSet, 'quotes')


urlpatterns = [
    path('api/', include(router.urls)),
    path('quotes/', include('quotes.urls')),
    path('tagged/', views.QuoteViewSet.filter_for_tags, name='tagged'),
    path('admin/', admin.site.urls),
]
