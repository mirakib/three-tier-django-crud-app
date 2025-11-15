# ---------------------------
# Stage 1 — Build wheels
# ---------------------------
FROM python:3.12-alpine AS builder

# System deps for building psycopg2 + wheels
RUN apk add --no-cache gcc musl-dev python3-dev postgresql-dev

WORKDIR /wheels

# Copy requirements
COPY requirements.txt .

# Build wheels for ALL packages + dependencies
RUN pip wheel --no-cache-dir -r requirements.txt -w /wheels


# ---------------------------
# Stage 2 — Final runtime
# ---------------------------
FROM python:3.12-alpine

# Install system deps for runtime psycopg2
RUN apk add --no-cache postgresql-client

WORKDIR /app

# Copy wheels from stage 1
COPY --from=builder /wheels /wheels

# Install using wheelhouse only (no internet)
COPY requirements.txt .
RUN pip install --no-cache-dir --no-index --find-links=/wheels -r requirements.txt

# Copy backend project files
COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
