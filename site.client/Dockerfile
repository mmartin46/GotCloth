
# Build react app
FROM node:18-alpine AS build

# Work directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code and config.
COPY . .



# Environment variables for Docker build
ENV DOCKER_BUILD=true
ENV NODE_ENV=production


# Accept VITE_API_URL for a build arg
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the frontend
RUN npm run build




# Serve with nginx
FROM nginx:alpine AS production

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
CMD ["nginx", "-g", "daemon off;"]