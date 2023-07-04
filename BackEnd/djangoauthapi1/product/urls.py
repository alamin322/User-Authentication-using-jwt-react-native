from product import views
from django.urls import path

app_name = 'product'

urlpatterns = [
    path(route="list/", view=views.ItemListView.as_view(), name="listview"),
    path(route='create/', view=views.CreateItemView.as_view(), name='createview'),
    path(route='read/<int:pk>', view=views.RetrieveItemView.as_view(), name='readview'),
    path(route='update/<int:pk>', view=views.UpdateItemView.as_view(), name='updateview'),
    path(route='delete/<int:pk>', view=views.DestroyItemView.as_view(), name='deleteview'),
]