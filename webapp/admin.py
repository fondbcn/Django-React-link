from django.contrib import admin
from .models import todo

class todoAdmin(admin.ModelAdmin):
    list_display=("title","description","completed","created_at")
    
admin.site.register(todo,todoAdmin)