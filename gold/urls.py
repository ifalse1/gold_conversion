from django.urls import path

from . import views

app_name = "gold"
urlpatterns = [
	path('', views.index, name='index'),
	path('plan', views.plan, name='plan'),
]
