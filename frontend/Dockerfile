# ============================
# Base Stage (Common Setup)
# ============================
FROM node:lts-alpine AS base
WORKDIR /usr/src/app

# Install dependencies required for build
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# ============================
# Development Stage (Vite HMR)
# ============================
FROM base AS dev

# Expose Vite development port
EXPOSE 5173

# Healthcheck for development (ensures Vite is running)
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
    CMD wget --quiet --tries=1 --spider http://localhost:5173/ || exit 1

# Set environment variable
ENV NODE_ENV=development

# Start Vite for hot module replacement (HMR)
CMD ["npm", "run", "dev"]

# ============================
# Build Stage (Production)
# ============================
FROM base AS build
RUN npm run build

# ============================
# Production Stage (Nginx)
# ============================
FROM nginx:stable-alpine

# Copy nginx configuration if you have a custom config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets from builder stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Add healthcheck for production
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Expose port 80 for production
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
