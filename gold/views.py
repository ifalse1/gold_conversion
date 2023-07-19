from django.shortcuts import render
from datetime import datetime

# Create your views here.
def index(request):
	now = datetime.now()
	return render(request, 'gold/index.html', {'now': now.strftime('%Y-%m-%d')})

def plan(request):
	return render(request, 'gold/plan.html')
