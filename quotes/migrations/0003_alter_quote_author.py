# Generated by Django 4.1.3 on 2022-11-30 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quotes', '0002_category_rename_quote_text_quote_quote_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quote',
            name='author',
            field=models.CharField(default='Unknown', max_length=255),
        ),
    ]
