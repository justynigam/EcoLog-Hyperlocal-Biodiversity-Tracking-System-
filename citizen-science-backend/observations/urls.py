from django.urls import path , include
from rest_framework.routers import DefaultRouter
from .views import ObservationViewSet

router = DefaultRouter()
router.register(r'observations' , ObservationViewSet , basename= 'observation')

urlpatterns = [
    path('' , include(router.urls)),
    path('observations/upload_photo/', ObservationViewSet.as_view({'post': 'upload_photo'}), name='upload_photo')
]
