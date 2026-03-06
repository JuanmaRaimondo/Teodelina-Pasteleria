# ==========================================
# ETAPA 1: CONSTRUCCIÓN (Node.js)
# ==========================================
# Usamos una versión oficial y liviana de Node.js
FROM node:20-alpine AS build

# Le decimos a Docker que trabaje en la carpeta /app
WORKDIR /app

# Copiamos los archivos de configuración de dependencias primero
COPY package.json package-lock.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos todo el resto del código de React
COPY . .

# Compilamos el proyecto para producción (Vite crea una carpeta llamada 'dist')
RUN npm run build

# ==========================================
# ETAPA 2: PRODUCCIÓN (Nginx)
# ==========================================
# Usamos un servidor web Nginx súper liviano
FROM nginx:alpine

# Copiamos los archivos compilados de la Etapa 1 (carpeta /dist) a la carpeta pública de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Reemplazamos la configuración por defecto de Nginx con la nuestra
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80 (el estándar para páginas web)
EXPOSE 80

# Prendemos el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]