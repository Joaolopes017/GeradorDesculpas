# Frontend Dockerfile
FROM node:20-alpine as build

WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências (mudado de npm ci para npm install)
RUN npm install

# Copia código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Stage de produção com nginx
FROM nginx:alpine

# Copia build para nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
