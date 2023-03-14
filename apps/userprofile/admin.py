from django.contrib import admin

from .models import Profile

admin.site.register(Profile)
# make the user profile visible in the Django admin