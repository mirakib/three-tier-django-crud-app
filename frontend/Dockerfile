# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY src/ /app/

# Runtime stage
FROM nginx:1.26-alpine
COPY --from=build /app /usr/share/nginx/html
# Remove default nginx.conf so default behavior serves static files from /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
