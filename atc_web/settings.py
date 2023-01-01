from pathlib import Path
import os
import json
import sys

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!

SECRET_BASE_FILE = os.path.join(BASE_DIR, 'secrets.json')
secrets = json.loads(open(SECRET_BASE_FILE).read())
for key, value in secrets.items():
    setattr(sys.modules[__name__], key, value)
# SECRET_KEY => secrets.json

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    ###Base
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
    #allauth
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.kakao',
    'allauth.socialaccount.providers.github',
    'allauth.socialaccount.providers.google',
    #DRF
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    #dj-rest-auth
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

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))



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

# REST_AUTH_SERIALIZERS = {
#     'USER_DETAILS_SERIALIZER':'bck_accnt.serializers.UserSerializer'
# }

REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER':'bck_accnt.serializers.UserRegisterSerializer'
}


### Database => screts.json

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


###html files

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(ROOT_DIR,'fntend','static')],#react
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

### Static files (CSS, JavaScript, Images)

STATIC_URL = 'static/'
STATICFILES_DIRS = [
    os.path.join(ROOT_DIR,'fntend','static'),
]
# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
