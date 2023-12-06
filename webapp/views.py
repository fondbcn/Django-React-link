from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .serializers import todoSerializer,userSerializer
from rest_framework.response import Response 
from .models import todo
from rest_framework.permissions import AllowAny,IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken,BlacklistedToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
import jwt
from datetime import datetime,timedelta
import requests


class todoView(viewsets.ModelViewSet):
    serializer_class=todoSerializer
    queryset=todo.objects.all()
    
class userView(APIView):
    def post(self,request):
        serializer=userSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class loginView(APIView):
    def post(self,request):
        username=request.data["username"]
        password=request.data["password1"]
        sesch=request.data["sesch"]
        user=User.objects.filter(username=username).first()
        if user is None or not user.check_password(password):
            raise AuthenticationFailed("User not found")
        is_admin = user.is_staff
        session=datetime.utcnow()+timedelta(minutes=1440) if sesch else datetime.utcnow()+timedelta(minutes=15)
        payload={
            "id":username,
            "exp":session,
            "iat":datetime.utcnow(),
            "is_adm":is_admin
        }
        token=jwt.encode(payload,"secrettt",algorithm="HS256")
        res=Response()
        # res.set_cookie(key="jwt",value=token,httponly=True)
        res.data={"jwt":token}
        return res
      
class getUserView(APIView):
    def get(self,request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        if not token:
            raise AuthenticationFailed('Error')
        try:
            payload=jwt.decode(token,"secrettt",algorithms="HS256",options={'verify_signature': True,'verify_exp': True,'verify_nbf': False,'verify_iat': True,'verify_aud': False})
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Error')
        except jwt.InvalidTokenError as e:
            raise AuthenticationFailed('Error')
        except jwt.DecodeError:
            raise AuthenticationFailed('Error')
        user=User.objects.filter(username=payload['id']).first()
        serUser=userSerializer(user)
        response_data = {
            'user': serUser.data,
            'exp': (payload['exp'] - payload['iat'])/60,
            'is_adm':payload['is_adm']
        }
        response = Response(response_data)
        print(response_data)
        return response