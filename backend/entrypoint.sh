#!/bin/sh
set -e

# Wait for DB to be available
echo "Waiting for DB at ${DATABASE_HOST:-db}..."
python - <<PYCODE
import os, time, sys
import socket
host = os.environ.get('DATABASE_HOST','db')
port = 5432
for i in range(60):
    try:
        import psycopg2
        conn = psycopg2.connect(
            dbname=os.environ.get('DATABASE_NAME'),
            user=os.environ.get('DATABASE_USER'),
            password=os.environ.get('DATABASE_PASSWORD'),
            host=host
        )
        conn.close()
        print("Database available")
        break
    except Exception as e:
        print(f"DB not ready, retrying... {i+1}/60")
        time.sleep(1)
else:
    print("Database not available, exiting.")
    sys.exit(1)
PYCODE

# Apply migrations and collectstatic (no-op if static not used)
echo "Running migrations..."
python manage.py migrate --noinput

# Create a default superuser if DJANGO_DEBUG=1 and no superuser exists (optional)
if [ "${DJANGO_DEBUG:-0}" = "1" ]; then
  python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); \
  u='admin'; \
  p='admin'; \
  \
  \
  exists=User.objects.filter(username=u).exists(); \
  print('Creating admin user' if not exists else 'Admin exists'); \
  \
  if not exists: \
    User.objects.create_superuser(username=u,email='admin@local.test',password=p)"
fi

exec "$@"
