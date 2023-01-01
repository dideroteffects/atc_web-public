from allauth.account.adapter import DefaultAccountAdapter

class CustomAccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)#username기존에 있음
        data = form.cleaned_data
        user.username = data.get('name')#model에 생성한 username으로 오버라이딩
        user.job = data.get('job')
        user.save()
        return user