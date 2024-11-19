# Usa una imagen base con Node.js 18 o superior
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu aplicación
COPY . .

# Instala las dependencias
RUN npm install

# Construye la aplicación en modo producción
#RUN npm run build --prod
# Paso 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copia la configuración personalizada de Nginx
COPY Nginx/nginx.conf /etc/nginx/nginx.conf

# Copia los archivos generados de Angular al directorio donde Nginx los sirve
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Expone el puerto 80 para el tráfico HTTP
EXPOSE 80
# Comando predeterminado para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]