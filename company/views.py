from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy

from .models import companyCRUD

# Create your views here.



#class CompanyDetail(DetailView):
 #   model = companyCRUD

#class CompanyCreate(CreateView):
 #   model = companyCRUD
    # Field must be same as the model attribute
 #   fields = ['name', 'industry', 'location', 'linkedIn']
  #  success_url = reverse_lazy('company_list')

#class CompanyUpdate(UpdateView):
 #   model = companyCRUD
    # Field must be same as the model attribute
 #   fields = ['name', 'industry', 'location', 'linkedIn']
  #  success_url = reverse_lazy('company_list')

#class CompanyDelete(DeleteView):
 #   model = companyCRUD
 #   success_url = reverse_lazy('company_list')