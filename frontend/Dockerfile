# Set Up the Build Environment

FROM node:23-apline As builder
WORKDIR /app

# install Install Dependencies Efficiently
 COPY package*.json ./
 RUN npm install

#  Copy Code and Build
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Switch to the Nginx Web Server

FROM nginx:alpine

# Transfer the Compiled Files (Bring the finished files over from the builder stage:)

COPY --from=builder /app/dist /usr/share/nginx/html

# Step 6: Add the Configuration and Start (Finally, add the routing configuration and the startup command)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]