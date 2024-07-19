# Use the official Node.js image.
FROM node:18-alpine AS builder

# Set the working directory.
WORKDIR /app

# Copy the package.json and package-lock.json.
COPY ./package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the React app.
RUN npm run build

# Serve the React app using a static server.
# RUN npm install -g serve
# CMD ["npx", "-s", "serve", "dist"]


FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html