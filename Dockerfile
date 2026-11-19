# Etapa 1: Compilar la aplicación Angular
FROM node:22-alpine AS build
WORKDIR /app

# Copiar dependencias y construirlas aprovechando caché
COPY burrito-lector-frontend/package*.json ./burrito-lector-frontend/
WORKDIR /app/burrito-lector-frontend
RUN npm install

# Copiar el código fuente y compilar para producción
COPY burrito-lector-frontend/ ./
RUN npm run build --configuration=production

# Etapa 2: Servidor web ultraligero Nginx
FROM nginx:alpine

# Puerto por defecto (80), adaptable automáticamente si el host define $PORT (Render, Railway, etc.)
ENV PORT=80

# Configurar soporte para SPA (Single Page Application) y puerto dinámico
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copiar los archivos compilados de Angular al directorio web de Nginx
COPY --from=build /app/burrito-lector-frontend/dist/burrito-lector-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
