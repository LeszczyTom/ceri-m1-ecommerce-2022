# ==== CONFIGURE =====
# Use a Node 19 base image
FROM node:19-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (8080 is the default that `serve` uses)
EXPOSE 8080
# Start the app
CMD [ "npx", "serve", "build" ]

# docker run -p 8080:8080 -d frontend