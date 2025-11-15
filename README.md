# Three Tier django CRUD App
**Dockerized Django (v5) + Postgres + PgAdmin + Bootstrap frontend**

A production-oriented, Three tier Docker-first multi-service Django CRUD web application with Postgres and Traefik as reverse proxy that demonstrates best practices for containerized deployments.

Flow: `Traefik` (reverse proxy & dashboard) → Frontend (static `Bootstrap` pages) → Backend (`Django` 5 API + templates / REST endpoints) → `Postgres` (with PgAdmin for DB admin).
