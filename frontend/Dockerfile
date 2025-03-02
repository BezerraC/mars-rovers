# Use the Node.js base image to build the frontend
FROM node:18 AS build
WORKDIR /app

# Copy the project files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the code and build the project
COPY . .
RUN npm run build

# Use the Nginx base image to serve the frontend
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy the compiled files from the build stage
COPY --from=build /app/build .

EXPOSE 80

# Define the command to run Nginx
CMD ["nginx", "-g", "daemon off;"]