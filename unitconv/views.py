from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse

from .models import Conversion

# Create your views here.
def index(request):
    return render(request, 'unitconv/index.html')

def convertAPI(request):
    resp = {'':''}
    try:
        if request.GET['from'] not in ["lb", "T", "g", "kg", "oz", "t_oz"] or request.GET['to'] not in ["lb", "T", "g", "kg", "oz", "t_oz"] or float(request.GET['value']) < 0:
            resp = {'error': 'Invalid unit conversion request. Try convert?from=<unit>&to=<unit>&value=<non negative floating point>'}
        else:
            fromUnit = get_object_or_404(Conversion, unit=request.GET['from'])
            toUnit = get_object_or_404(Conversion, unit=request.GET['to'])

            # Converts to Tons
            value = float(request.GET['value']) / fromUnit.conversion
            # Converts to new Unit
            value *= toUnit.conversion

            resp = {'units': toUnit.unit}
            resp['value'] = value
    except:
        resp = {'error': "There was an error with the request. Try convert?from=<unit>&to=<unit>&value=<non negative floating point>"}
    return JsonResponse(resp)