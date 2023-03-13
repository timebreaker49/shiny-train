FROM --platform=linux/arm64 python:3.8 as build

ENV PYTHONUNBUFFERED=1

WORKDIR /app
ADD ./quotesbackend/requirements.txt /app/quotesbackend/

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r quotesbackend/requirements.txt

ADD ./docker /app/docker
ADD ./quotesbackend /app/quotesbackend
