from django.contrib import admin
from django.urls import path,include
from webapp import views
from rest_framework import routers

router=routers.DefaultRouter()
router.register(r'tasks',views.todoView,'task')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('login/', views.loginView.as_view()),
    path('register/',views.userView.as_view()),
    path('user/',views.getUserView.as_view()),
]
