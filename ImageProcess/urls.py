from django.urls import path 
from . import views 

urlpatterns = [ 
	path('image/base64/', views.base64Process),
	path('image/url/', views.saveServerProcess),
	path('report/', views.report),
]