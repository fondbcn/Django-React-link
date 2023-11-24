from django.db import models

class todo(models.Model):
    title=models.CharField(max_length=120)
    description=models.CharField(max_length=600)
    completed=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
        