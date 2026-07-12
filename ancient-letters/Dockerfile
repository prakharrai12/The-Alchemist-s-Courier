# ==========================================
# MULTI-STAGE DOCKER BUILD — ALCHEMIST FRONTEND
# ==========================================
FROM node:20-alpine AS build
WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm ci || npm install

COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx-frontend.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
