# ----------------------------
# Build stage
# ----------------------------
FROM node:20 AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy source and build
COPY . .
RUN npm run build

# ----------------------------
# Runtime stage
# ----------------------------
FROM node:20 AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy only what we need for runtime
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]
