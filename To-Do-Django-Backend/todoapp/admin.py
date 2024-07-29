from django.contrib import admin
from .models import Task, Card, UserProfile, Projects
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'taskName', 'taskStatus', 'description', 'file', 'cover')
    list_filter = ('taskStatus',)
    search_fields = ('taskName',)
    filter_horizontal = ('assignedTo', 'assigned_groups')

admin.site.register(Task, TaskAdmin)

class CardAdmin(admin.ModelAdmin):
    list_display = ['id', 'card_name']

admin.site.register(Card, CardAdmin)

class AccountInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Details'
    fields = ('tech_stack', 'role', 'designation', 'assigned_project', 'profile_photo')

class CustomUserAdmin(UserAdmin):
    inlines = (AccountInline,)

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

class ProjectsAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'deadline', 'status', 'manager']
    search_fields = ['name', 'status', 'manager']
    list_filter = ['status']

admin.site.register(Projects, ProjectsAdmin)

admin.site.site_header = "To Do Application"
admin.site.index_title = "To Do Application"
