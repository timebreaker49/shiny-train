FROM python:3.8-alpine3.17

WORKDIR /app
ADD ./quotesbackend/requirements.txt /app/quotesbackend/

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r quotesbackend/requirements.txt

ADD ./docker /app/docker
ADD ./quotesbackend /app/quotesbackend
