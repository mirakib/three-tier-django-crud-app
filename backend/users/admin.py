from django.contrib import admin
from .models import UserEntry

@admin.register(UserEntry)
class UserEntryAdmin(admin.ModelAdmin):
    list_display = ('id','name','email','created_at')
    search_fields = ('name','email')
