# FROM nginx:alpine

# RUN apk add --no-cache nodejs npm

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


FROM node:20-alpine3.20 As build

WORKDIR /usr/src/app

COPY package*.json package-lock.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

FROM nginx:stable-alpine as production

COPY --from=build /usr/src/app/nginx /etc/nginx/conf.d

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"] 