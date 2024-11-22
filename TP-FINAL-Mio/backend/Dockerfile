# Usar una imagen base de Node.js
FROM node:18

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto donde el servidor de Node.js escuchará (puerto 3000 en este caso)
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "start"]
