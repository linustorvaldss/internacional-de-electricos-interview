# se usa el stage para optimizar la imagen de docker, 
# un stage para construir la app y otro stage
# para ejecutar la aplicacion en produccion

# --- BUILD ---
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build

