FROM nginx:alpine

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=0 /app/dist /app/dist

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
