# Generated by Django 4.1.3 on 2022-11-30 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quotes', '0004_rename_category_category_quotes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='quotes',
            field=models.ManyToManyField(related_name='quotes', to='quotes.quote'),
        ),
    ]