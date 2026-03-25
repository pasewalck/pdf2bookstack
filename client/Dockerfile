FROM node:22-alpine as build-stage

WORKDIR /app

ARG VITE_BACKEND_API_URL
ENV VITE_BACKEND_API_URL=$VITE_BACKEND_API_URL

ARG VITE_BOOKSTACK_URL
ENV VITE_BOOKSTACK_URL=$VITE_BOOKSTACK_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
