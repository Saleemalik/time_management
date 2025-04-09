from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User

# Create your models here.


class Task(models.Model):
    """user can create task"""
    title = models.CharField(_("Title"), max_length=50)
    user = models.ForeignKey(User, verbose_name=_(""), on_delete=models.CASCADE)
    description = models.TextField()
    priority_choices = (
        ('LOW', 'LOW'),
        ('MEDIUM', 'MEDIUM'),
        ('HIGH', 'HIGH'),
    )
    priority = models.CharField(max_length=15, choices=priority_choices, default='MEDIUM')
    status_choices = (
        ('PENDING', 'PENDING'),
        ('COMPLETED', 'COMPLETED'),
    )
    status = models.CharField(max_length=15, choices=status_choices, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    
