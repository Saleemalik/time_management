# start project

### Virtual Environment Setup
```bash
python3 -m venv env
source env/bin/activate
```

```bash
pip install -r requirements.txt
touch .env 
copy and paste .env.example and add mysql db
python manage.py migrate
DJANGO_SUPERUSER_PASSWORD=admin ./manage.py createsuperuser --username=admin --email=admin@alain.com --noinput
./manage.py runserver
```