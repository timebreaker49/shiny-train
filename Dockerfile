FROM python:3

ENV PYTHONUNBUFFERED=1

WORKDIR /

RUN pip install django django-cors-headers django-taggit djangorestframework beautifulsoup4 requests

COPY . .

EXPOSE 8000