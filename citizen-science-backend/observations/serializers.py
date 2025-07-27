from rest_framework import serializers
from .models import Observation

class ObservationSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Observation
        fields = ['id', 'user_id', 'species_name', 'photo', 'photo_url', 'latitude', 'longitude', 'notes', 'created_at']

    def get_photo_url(self, obj):
        request = self.context.get('request')
        if obj.photo and request:
            return request.build_absolute_uri(obj.photo.url)
        elif obj.photo:
            return obj.photo.url
        return None
