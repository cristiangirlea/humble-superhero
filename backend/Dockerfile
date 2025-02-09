# ---- Base image for building ----
FROM node:lts-alpine AS builder

# Install necessary dependencies
RUN apk add --no-cache openssl python3 make g++

# Set working directory
WORKDIR /usr/src/app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies (optimized for caching)
RUN npm install

# Copy source code, Prisma schema, and configuration files
COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./

# Generate Prisma Client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Build the NestJS app
RUN npm run build

# ---- Development image ----
FROM node:lts-alpine AS development

# Install OpenSSL for Prisma compatibility
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /usr/src/app

# Copy dependencies from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Copy built app from builder
COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/prisma ./prisma

# Set development environment
ENV NODE_ENV=development

# Expose backend port
EXPOSE 3000

# Health check to ensure service is up
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
    CMD node -e "require('http').request({ host: 'localhost', port: 3000, path: '/health', timeout: 2000 }, (r) => {if (r.statusCode !== 200) throw new Error()})"

# Ensure Prisma Client is generated in development
RUN npx prisma generate --schema=./prisma/schema.prisma

# Ensure migrations are applied before starting the app
CMD ["sh", "-c", "npx prisma migrate deploy --schema=./prisma/schema.prisma && exec npm run start:dev"]