FROM node:20 AS builder

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20

WORKDIR /app
COPY --from=builder /app/dist ./dist

# Usando serve como webserver (igual Vite recomendaria)
RUN npm install -g serve

EXPOSE 4173
CMD ["serve", "-s", "dist"]