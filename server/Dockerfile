FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./

RUN npm install

# Install global tools
RUN npm install -g typescript

# Copy source code
COPY . .

# Expose port
EXPOSE 8000


CMD ["npm", "run", "dev"]