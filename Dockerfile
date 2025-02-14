FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2
FROM nginx:alpine

# Install nginx if needed
RUN apk add --no-cache nginx

# Remove default nginx config
RUN rm /etc/nginx/nginx.conf

# Copy nginx config file to container
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy build output to nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
