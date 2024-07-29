from django.db import models
from django.contrib.auth.models import User,Group
from django.db.models import Count
# Create your models here.

class Projects(models.Model):
    id = models.AutoField(primary_key=True)  
    name = models.CharField(max_length=255)
    deadline = models.DateField()
    team = models.CharField(max_length=255)  
    status = models.CharField(max_length=50)
    manager = models.CharField(max_length=255, default="Default Manager")  

    def __str__(self):
        return self.name
    
class Card(models.Model):
    card_name = models.CharField(max_length=30)
    def __str__(self):
        return self.card_name
    
class Task(models.Model):
    taskName = models.CharField(max_length=255,null=True, blank=True)
    # status = models.CharField(max_length=50,null=True, blank=True) this used in version 1.0 for making simple text field
    taskStatus = models.ForeignKey(Card, on_delete=models.CASCADE)
    assignedTo = models.ManyToManyField(User, related_name='tasks')
    assigned_groups = models.ManyToManyField(Group, related_name='group_tasks',blank=True)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE,null=True)
    description = models.CharField(max_length=100,null=True,blank=True)
    deadline = models.DateField(null=True, blank=True)
    file = models.FileField(max_length=100, upload_to="media/", null=True, blank=True)
    Priority_High = 'high'
    Priority_Medium = 'medium'
    Priority_Low = 'low'

    MY_CHOICES = [
        (Priority_High, 'high'),
        (Priority_Medium, 'medium'),
        (Priority_Low, 'low'),
    ]

    priority = models.CharField(
        max_length=20,
        choices=MY_CHOICES,
        default=Priority_Low,
    )
    checklist = models.TextField(default="Not Available",null=True, blank=True)
    cover = models.CharField(max_length=100, default='#ffffff', null=True, blank = True)
    tech_stack = models.CharField(max_length=50, null=True, blank=True)

    # def __str__(self):
    #     return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    tech_stack = models.CharField(max_length=50, null=True, blank=True)
    role = models.CharField(
        max_length=50, null=True,
        choices=[
            ('UI/UX Designer', 'UI/UX Designer'),
            ('Backend Developer', 'Backend Developer'),
            ('Full Stack Developer', 'Full Stack Developer'),
            ('Cloud Developer', 'Cloud Developer')
        ]
    )
    designation = models.CharField(
        max_length=50,
        choices=[
            ('User', 'User'),
            ('Super User', 'Super User'),
            ('Manager', 'Manager'),
            ('Team Lead', 'Team Lead')
        ],
        default='User'
    )
    assigned_project = models.ForeignKey(Projects, on_delete=models.CASCADE, null=True, blank=True)
    profile_photo = models.ImageField(upload_to='profile_photos/', null=True, blank=True)

    # def __str__(self):
    #    return self.user.username



    # current_status = models.CharField(max_length=30, default='Not Started')

