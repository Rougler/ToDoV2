import json
from django.http import FileResponse
from django.core.serializers import serialize
from django.urls import reverse
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.shortcuts import render, redirect
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.decorators import api_view
from todoapp.serializers import *
from django.contrib.auth.decorators import login_required, user_passes_test
from todoapp.models import Task,Card
from .utils import save_project_data_as_text
from .decorators import manager_required
from rest_framework import permissions
# Create your views here.
@api_view(['POST'])
# @admin_required
# @login_required
# @manager_required
def create_task(request):
    if request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskDeleteView(generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    # permission_classes = [permissions.IsAdminUser]  # Only admin users can delete tasks
    # @method_decorator(manager_required) #for manager
    def delete(self, request, *args, **kwargs):
        task = self.get_object()
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class UserListView(generics.ListAPIView):
    # permission_classes = [permissions.IsAdminUser]  # Only admin users can delete tasks
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

admin_required = user_passes_test(lambda user: user.is_superuser)
class LoginView(APIView):
    # permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user.is_superuser:
            tasks = Task.objects.all()  # Get all tasks for superuser
            tasks_json = serialize('json', tasks,use_natural_foreign_keys=True,
                           use_natural_primary_keys=True)
            # Parse and serialize JSON to remove escape characters
            tasks_json_cleaned = json.loads(tasks_json)
            # Return JSON response
            return JsonResponse(tasks_json_cleaned, safe=False)
        elif user.userprofile.role == "Manager":
            return Response({'msg':'manager log in success'},status=status.HTTP_200_OK)
        else:
            tasks = Task.objects.filter(assigned_to=user)  # Filter tasks by logged-in user
            tasks_json = serialize('json', tasks,use_natural_foreign_keys=True,
                           use_natural_primary_keys=True)
            tasks_json_cleaned = json.loads(tasks_json)
            # Return JSON response
            return JsonResponse(tasks_json_cleaned, safe=False)

class UpdateDateView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = MyModelSerializer
class UpdateDescriptionView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = Update_Description

class UpdateStatusView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = Update_Status

class UpdateNameView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = Update_Name

# @api_view(['PUT'])
# def create_or_update_tasks(request):
#     if request.method == 'PUT':
#         data = json.loads(request.body)  # Assuming JSON data is sent in the request body
#         task = Task.objects.get(pk=data["project_id"])
#         d = {}
#         for k,v in data.items():
#             d[k]=v
#         task.checklist = str(d)
#         task.save()
#     return JsonResponse({'message': 'Tasks created/updated successfully'}, status=200)
# # else:
#     return JsonResponse({'error': 'Invalid request method'}, status=400)
# class create_or_update_tasks(generics.UpdateAPIView):
#     queryset = Task.objects.all()
#     serializer_class = Update_Checklist
#views for save checklists
@api_view(['POST'])
def save_data_view(request,id):
    if request.method == 'POST':
        try:
            # Assume the JSON data is sent in the body of the request
            json_data = json.loads(request.body)
            save_project_data_as_text(id,json_data)
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'failed', 'message': str(e)})
    else:
        return JsonResponse({'status': 'failed', 'message': 'Only POST requests are allowed'})

class ImageUpdateView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def put(self, request, pk):
        try:
            image_instance = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response({'error': 'Image not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UploadedFileSerializer(image_instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#Delete User
class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDeleteSerializer
    def delete(self, request, *args, **kwargs):
        task = self.get_object()
        task.delete()
        return Response({"msg":"User Deleted Successfully"},status=status.HTTP_204_NO_CONTENT)
class TaskListView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
class TaskDetailView(APIView):
    def get(self, request, task_id):
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = TaskSerializer(task)
        return Response(serializer.data)
class CoverUpdateView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = UpdateCoverColorSerializer

@api_view(['POST'])
# @admin_required
# @login_required
def create_group(request):
    if request.method == 'POST':
        serializer = GroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserUpdateAPIView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer

    def put(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CardListView(generics.ListAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

@api_view(['POST'])
# @login_required
def create_card(request):
    if request.method == 'POST':
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateUserView(APIView):
    permission_classes = [AllowAny]

    def put(self, request, user_id, *args, **kwargs):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DownloadAttachmentView(APIView):

    def get(self, request, pk, format=None):
        attachment = get_object_or_404(Task, pk=pk)
        response = FileResponse(attachment.file.open(), as_attachment=True, filename=attachment.taskName)
        return response

class attachment_delete_view(APIView):
    def delete(self, request, pk, format=None):
        attachment = get_object_or_404(Task, pk=pk)
        attachment.file.delete()  # Delete the file from the storage
        return Response(status=status.HTTP_204_NO_CONTENT)
@api_view(['POST'])
def create_project(request):
    if request.method == 'POST':
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
