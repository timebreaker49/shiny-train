from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from quotes import views


router = routers.DefaultRouter()
router.register(r'quotes', views.QuoteView, 'quotes')

urlpatterns = [
    path('api/', include(router.urls)),
    path('quotes/', include('quotes.urls')),
    path('admin/', admin.site.urls),
]
