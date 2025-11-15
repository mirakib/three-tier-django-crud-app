import json
from django.http import JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from .models import UserEntry
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict

@csrf_exempt
def users_list(request):
    if request.method == 'GET':
        objs = list(UserEntry.objects.all().order_by('-id').values())
        return JsonResponse(objs, safe=False)
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name','').strip()
            email = data.get('email','').strip()
            if not name or not email:
                return HttpResponseBadRequest("name and email required")
            obj = UserEntry.objects.create(name=name, email=email)
            return JsonResponse(model_to_dict(obj), status=201)
        except Exception as e:
            return HttpResponseBadRequest(str(e))
    return HttpResponseNotAllowed(['GET','POST'])

@csrf_exempt
def user_detail(request, pk):
    obj = get_object_or_404(UserEntry, pk=pk)
    if request.method == 'GET':
        return JsonResponse({'id': obj.id, 'name': obj.name, 'email': obj.email})
    if request.method in ('PUT','PATCH'):
        try:
            data = json.loads(request.body)
            obj.name = data.get('name', obj.name)
            obj.email = data.get('email', obj.email)
            obj.save()
            return JsonResponse({'id': obj.id, 'name': obj.name, 'email': obj.email})
        except Exception as e:
            return HttpResponseBadRequest(str(e))
    if request.method == 'DELETE':
        obj.delete()
        return JsonResponse({'deleted': True})
    return HttpResponseNotAllowed(['GET','PUT','PATCH','DELETE'])
