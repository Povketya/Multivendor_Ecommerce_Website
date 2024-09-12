from rest_framework import generics
from .models import Vendor
from .serializers import VendorSerializer

class VendorListAPIView(generics.ListAPIView):
    queryset = Vendor.objects.filter(active=True)
    serializer_class = VendorSerializer