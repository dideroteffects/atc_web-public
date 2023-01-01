from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class UserRegisterSerializer(RegisterSerializer):
    username = serializers.CharField(max_length=20)
    job = serializers.CharField(max_length=20)
    # is_staff = serializers.BooleanField(default=False)
    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['username'] = self.validated_data.get('username','')
        data_dict['job'] = self.validated_data.get('job','')
        return data_dict


# class UserRegisterSerializer(serializers.ModelSerializer):
#     passwords = serializers.CharField(style={'input_type':'password'}, write_only=True)
    
#     class Meta:
#         model = User
#         fields = ["email","password","password2","username","is_staff"]
#         extra_kwargs = {
#             'password': {
#                 'write_only':True
#             }
#         }
#     def save(self):
#         user = User(
#             email = self.validated_data['email'],
#             username = self.validated_data['username'],
#             is_staff = self.validated_data['is_staff'],
            
#         )
#         password = self.validated_data['password']
#         password2 = self.validated_data['password2']
        
#         if password != password2:
#             raise serializers.ValidationError({'password':'unmatched...'})
#         user.set_password(password)
#         user.save()
#         return user
    
