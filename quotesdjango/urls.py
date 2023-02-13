from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from quotes import views


router = routers.DefaultRouter()
router.register(r'quotes', views.QuoteViewSet, 'quotes')
router.register(r'tags', views.TagViewSet, 'tags')


urlpatterns = [
    path('api/', include(router.urls)),
    path('quotes/', include('quotes.urls')),
    path('tagged/', views.QuoteViewSet.filter_for_tags, name='tagged'),
    path('bulk-delete/', views.QuoteViewSet.bulk_delete, name='bulk-delete'),
    path('filter-by-author/<str:author>/', views.QuoteViewSet.filter_by_author, name='filter-by-author'),
    path('admin/', admin.site.urls),
]
