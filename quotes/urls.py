from django.urls import path, include

from . import views

app_name = 'quotes'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('<int:quote_id>/add_to_category', views.add_to_category, name='add_to_category'),
]
