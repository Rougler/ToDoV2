from django.db import models
from django.contrib.auth.models import User,Group
# Create your models here.

class Project(models.Model):
    projname = models.CharField(max_length=100)
    assignedTo = models.ManyToManyField(User, related_name='assigned_project')
    def __str__(self):
        return self.projname
class Card(models.Model):
    card_name = models.CharField(max_length=30)
    def __str__(self):
        return self.card_name
class Task(models.Model):
    taskName = models.CharField(max_length=255)
    # status = models.CharField(max_length=50,null=True, blank=True) this used in version 1.0 for making simple text field
    taskStatus = models.ForeignKey(Card, on_delete=models.CASCADE)
    assignedTo = models.ManyToManyField(User, related_name='tasks')
    assigned_groups = models.ManyToManyField(Group, related_name='group_tasks', blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE,null=True,blank=True)
    description = models.CharField(max_length=100,null=True,blank=True)
    start_date = models.DateField(null=True, blank=True)
    done_date = models.DateField(null=True, blank=True)
    file = models.FileField(max_length=100, upload_to="media/", null=True, blank=True)
    priority = models.IntegerField(default=1)
    checklist = models.TextField(default="Not Available",null=True, blank=True)
    cover = models.CharField(max_length=100, default='#ffffff', null=True, blank = True)
    # def __str__(self):
    #     return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    proficiency = models.CharField(max_length=50,null=True,blank=True)
    tech_stack = models.CharField(max_length=50,null=True,blank=True)
    intials = models.CharField(max_length=50,null=True,blank=True)
    status = models.CharField(max_length=50,
                              choices=[('Active','Active'),('In Active','In Active')],default=('In Active','In Active'))
    role = models.CharField(max_length=50,
                              choices=[('User', 'User'),('Super User', 'Super User'), ('Manager', 'Manager')],default=('User'))

    # def __str__(self):
    #    return self.user


    # current_status = models.CharField(max_length=30, default='Not Started')


