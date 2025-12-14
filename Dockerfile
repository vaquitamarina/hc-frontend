FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Exponemos el puerto de Vite
EXPOSE 5173

# Vite requiere la bandera --host para ser accesible desde fuera del contenedor
CMD ["npx", "vite", "--host"]