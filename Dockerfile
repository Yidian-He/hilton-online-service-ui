FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Build the app
RUN yarn build

# Expose server port
EXPOSE 5173

# Start preview server
CMD ["yarn", "preview", "--host", "0.0.0.0"]
