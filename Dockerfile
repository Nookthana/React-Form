FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY default-react-app /etc/nginx/conf.d/default.conf

COPY --from=0 /app/dist /app/dist

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
