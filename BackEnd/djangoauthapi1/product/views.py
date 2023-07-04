from django.shortcuts import render
from product.serializers import ItemSerializer
from product.models import Item
from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated


# Create your views here.
# All Items view
class ItemListView(ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    # permission_classes = [IsAuthenticated]

# New create item view
class CreateItemView(CreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    # permission_classes = [IsAuthenticated]

# New retrieve item view
class RetrieveItemView(RetrieveAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    # permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

# Update item view
class UpdateItemView(UpdateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    # permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

# Delete item view
class DestroyItemView(DestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    # permission_classes = [IsAuthenticated]
    lookup_field = 'pk'