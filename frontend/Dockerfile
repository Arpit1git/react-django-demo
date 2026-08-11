# Set Up the Build Environment
FROM node:23-alpine AS builder
WORKDIR /app

# Install Dependencies Efficiently
COPY package*.json ./
RUN npm install

# Copy Code and Build
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Switch to the Nginx Web Server
FROM nginx:alpine

# Transfer the Compiled Files
COPY --from=builder /app/dist /usr/share/nginx/html

# Add the Configuration and Start
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]