# Build stage
FROM python:3.12-alpine AS build
# system deps for psycopg2 build and building wheels
RUN apk add --no-cache build-base linux-headers postgresql-dev libffi-dev musl-dev

WORKDIR /app
COPY requirements.txt /app/
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /wheels -r requirements.txt

# Final stage
FROM python:3.12-alpine
RUN apk add --no-cache libpq
WORKDIR /app
COPY --from=build /wheels /wheels
COPY requirements.txt /app/
RUN pip install --no-cache-dir --no-index --find-links=/wheels -r requirements.txt

# Copy project
COPY . /app
RUN chmod +x /app/entrypoint.sh

ENV PYTHONUNBUFFERED=1
EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["gunicorn", "backend_project.asgi:application", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000", "--workers", "1"]
