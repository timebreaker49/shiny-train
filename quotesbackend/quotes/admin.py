from django.contrib import admin
from .models import Quote

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_quotes')

    def get_quotes(self, obj):
        return ",\n".join([q.quote for q in obj.quotes.all()])

admin.site.register(Quote)