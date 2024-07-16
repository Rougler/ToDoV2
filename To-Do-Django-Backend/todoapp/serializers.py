# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User,Group
from .models import Task,Card,UserProfile,Project
class TaskSerializer(serializers.ModelSerializer):
    assignedTo = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field='username',
        many=True
    )
    taskStatus = serializers.SlugRelatedField(
        queryset=Card.objects.all(),
        slug_field='card_name',
        many=False
    )
    project = serializers.SlugRelatedField(
        queryset=Project.objects.all(),
        slug_field='projname',
        many=False
    )
    class Meta:
        model = Task
        fields = "__all__"
class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['proficiency', 'tech_stack','intials', 'status','role']

class UserSerializer(serializers.ModelSerializer):
    userprofile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['username','password', 'email', 'first_name', 'last_name','groups', 'userprofile']

    def create(self, validated_data):
        userprofile_data = validated_data.pop('userprofile')
        user = User.objects.create(**validated_data)

        # Setting the initials field in UserProfile using user's first and last names
        # userprofile_data['initials'] = user.first_name[0] + user.last_name[0]
        # UserProfile.objects.create(user=user, **userprofile_data)

        return user

    def update(self, instance, validated_data):
        user_profile_data = validated_data.pop('userprofile',None)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        # Update user profile fields if user_profile_data is provided
        if user_profile_data:
            user_profile = instance.userprofile
            user_profile.proficiency = user_profile_data.get('proficiency', user_profile.proficiency)
            user_profile.tech_stack = user_profile_data.get('tech_stack', user_profile.tech_stack)
            user_profile.intials = user_profile_data.get('intials', user_profile.intials)
            user_profile.status = user_profile_data.get('status', user_profile.status)
            user_profile.save()

        return instance

class RegistrationSerializer(serializers.ModelSerializer):#for user registeration or user signup
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

        def create(self, validated_data):
            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password']
            )
            return user
class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'start_date', 'done_date']

class Update_Description(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'description']

class Update_Status(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'taskStatus']

class Update_Name(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'taskName']


class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'file')

class UserDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        Model = User
        fields = "__all__"

class UpdateCoverColorSerializer(serializers.ModelSerializer):
    # cover_color = serializers.CharField()

    class Meta:
        model = Task
        fields = ['id','cover']

class GroupSerializer(serializers.ModelSerializer):
    assigned_to = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field='username',
        many=True
    )
    class Meta:
        model = Group
        fields = "__all__"

class UserUpdateSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(
        queryset=Group.objects.all(),
        slug_field='name',
        many=True
    )
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'groups','proficiency','tech_stack','intials','status']

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id','card_name']

# class AttachmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Task
#         fields = ['id', 'file',]
#
class ManagerRelatedField(serializers.SlugRelatedField):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.queryset = self.get_queryset()

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(userprofile__role='Manager')

class ProjectSerializer(serializers.ModelSerializer):
    assignedTo = ManagerRelatedField(
        queryset=User.objects.all(),
        slug_field='username',
        many=True
    )

    class Meta:
        model = Project
        fields = "__all__"