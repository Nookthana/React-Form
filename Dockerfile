# Stage 1 - Build React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2 - Set up Nginx
FROM nginx:alpine

# Remove default nginx config (ควรใช้ `RUN rm -f` เพื่อป้องกัน error หากไฟล์ไม่มีอยู่)
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy custom nginx config to container
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy the React app build output to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
