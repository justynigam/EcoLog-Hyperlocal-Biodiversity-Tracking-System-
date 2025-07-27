from django.contrib import admin

from django.contrib import admin
from .models import Observation

@admin.register(Observation)
class ObservationAdmin(admin.ModelAdmin):
    list_display = ("species_name", "user_id", "latitude", "longitude", "created_at")
    search_fields = ("species_name", "user_id")
    list_filter = ("species_name",)

# Or simply:
# admin.site.register(Observation)
