from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework import status
import os
import uuid
from django.conf import settings

from .models import Observation
from .serializers import ObservationSerializer


class ObservationViewSet(viewsets.ModelViewSet):
    queryset = Observation.objects.all().order_by('-created_at')
    serializer_class = ObservationSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    # optionally override get_parsers safely
    def get_parsers(self):
        action = getattr(self, 'action', None)
        if action == 'upload_photo':
            return [MultiPartParser(), FormParser()]
        return super().get_parsers()

    @action(detail=False, methods=['post'])
    def upload_photo(self, request):
        file_obj = request.data.get('photo', None)
        if not file_obj:
            return Response({"error": "No photo file provided"}, status=status.HTTP_400_BAD_REQUEST)

        file_extension = os.path.splitext(file_obj.name)[1]
        file_name = f"temp_photo_{uuid.uuid4()}{file_extension}"
        
        observations_folder = os.path.join(settings.MEDIA_ROOT, 'observations')
        os.makedirs(observations_folder, exist_ok=True)
        temp_file = os.path.join(observations_folder, file_name)
        
        with open(temp_file, 'wb+') as destination:
            for chunk in file_obj.chunks():
                destination.write(chunk)
        
        relative_url = os.path.join('observations', file_name).replace('\\', '/')
        photo_url = request.build_absolute_uri(settings.MEDIA_URL + relative_url)
        
        return Response({"photo_url": photo_url}, status=status.HTTP_201_CREATED)
