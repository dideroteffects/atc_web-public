from django.urls import path, include
from .views import UserViewSet,UserSessionCheck,UserDetail
from rest_framework import routers

router = routers.DefaultRouter()
router.register('view',UserViewSet)

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('user/detail/', UserDetail.as_view()),#유저 전체 조회
    path('user/', include(router.urls)),#유저 전체 조회
    path('user/session/', UserSessionCheck.as_view()),#유저 세션 확인
    path('registration/', include('dj_rest_auth.registration.urls')),
]
