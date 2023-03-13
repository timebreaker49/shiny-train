#!/bin/sh

until cd /app/quotesbackend/quotesdjango
do
    echo "Waiting for server volume..."
done

until /app/quotesbackend/manage.py makemigrations
do
    echo "Checking for migrations.."
    sleep 2
done

until /app/quotesbackend/manage.py migrate
do
    echo "Running migrations.."
    sleep 2
done

/app/quotesbackend/manage.py collectstatic --no-input

sh -c "cd /app/quotesbackend/ && gunicorn quotesdjango.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4"

#####################################################################################
# Options to DEBUG Django server
# Optional commands to replace abouve gunicorn command

# Option 1:
# run gunicorn with debug log level
# gunicorn server.wsgi --bind 0.0.0.0:8000 --workers 1 --threads 1 --log-level debug

# Option 2:
# run development server
# DEBUG=True ./manage.py runserver 0.0.0.0:8000