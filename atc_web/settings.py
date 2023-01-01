from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure--f$u0_j#+km3-#n4d8q7li(1s+4o3f2raeo$co+9#*%h8qzf4('

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    ###bck
    'bck_accnt',
    'bck_stry',
    'django.contrib.sites',
    
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    
    'rest_framework',
    'rest_framework.authtoken',
    'dj_rest_auth',
    
    'dj_rest_auth.registration',
    ###fnt
    'fntend',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'atc_web.urls'

import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,'fntend','static')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'atc_web.wsgi.application'

### Model - default - not djangos but custom
SITE_ID = 1
AUTH_USER_MODEL = 'bck_accnt.User'#
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_USERNAME_REQUIRED = False#
ACCOUNT_EMAIL_REQUIRED = True#
ACCOUNT_UNIQUE_EMAIL = True##
ACCOUNT_AUTHENTICATION_METHOD = 'email'#
ACCOUNT_EMAIL_VERIFICATION = 'none'
ACCOUNT_ADAPTER = 'bck_accnt.adapters.CustomAccountAdapter'
# ACCOUNT_LOGOUT_ON_GET = True



### Login Authentics
AUTHENTICATION_BACKENDS = [
    'allauth.account.auth_backends.AuthenticationBackend',
    'django.contrib.auth.backends.ModelBackend',
    
]
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ]
}

REST_USE_JWT = True
JWT_AUTH = {
    'JWT_AUTH_COOKIE' : 'my-app-auth',
    'JWT_AUTH_REFRESH_COOKIE' : 'my-refresh-token',
    # 'JWT_EXPIRATION_DELTA' : datetime.timedelta(seconds=300),
}

REST_AUTH_SERIALIZERS = {
    'USER_DETAIL_SERIALIZER':'bck_accnt.serializers.UserSerializer'
}

REST_AUTH_REGISTER_SERIALIZERS = {
    'RESGISTER_SERIALIZER':'bck_accnt.serializers.UserRegisterSerializer'
}


### Database

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'atc',
        'USER': 'root',
        'PASSWORD': 'ee2718ee',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}


### Password validation

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


### Static files (CSS, JavaScript, Images)

STATIC_URL = 'static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR,'fntend','static'),
]
# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
