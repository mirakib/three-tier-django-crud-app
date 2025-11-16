# [Unfinished]

<div style="display: flex; align-items: center; gap: 10px;">
  <img src="https://skillicons.dev/icons?i=bootstrap,django,python,postgres,docker" style="height: 40px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/traefikproxy/traefikproxy-original.svg" style="height: 40px;"/> 
</div>

# Three Tier django CRUD App 

**Dockerized Django (v5) + Postgres + PgAdmin + Bootstrap frontend**

A production-oriented, Three tier Docker-first multi-service Django CRUD web application with Postgres and Traefik as reverse proxy that demonstrates best practices for containerized deployments.

Flow: `Traefik` (reverse proxy & dashboard) → Frontend (static `Bootstrap` pages) → Backend (`Django` 5 API + templates / REST endpoints) → `Postgres` (with PgAdmin for DB admin).

# Features
- **Django 5** backend with RESTful API endpoints for CRUD operations.
- **PostgreSQL** database for robust data storage.
- **PgAdmin** for easy database management.
- **Bootstrap** frontend for responsive UI.
- **Traefik v3.1** as a reverse proxy to manage routing and SSL termination.
