#################
# BUILD
#################

# Use smaller node image
FROM node:20-alpine AS build

# Set working directory
WORKDIR /var/www/html

# Copy package*.json and package-lock.json and install dependencies
COPY --chown=node:node package*.json ./

# Install all deps
RUN npm install

# Copy all other files
COPY --chown=node:node . .

#################
# DEVELOPMENT
#################

FROM node:20-alpine AS development

WORKDIR /var/www/html

# Only copy package.json, not node_modules
COPY --from=build /var/www/html/package.json ./package.json

# Copy the entire project files
COPY . .

# Fix permissions for node_modules and /var/www/html
RUN chown -R node:node /var/www/html && chmod -R 755 /var/www/html

# Expose port
EXPOSE 3000

# Run as user node
USER node

# Install dev dependencies
RUN npm install --onlyDevelopment

# Command to run nodemon
CMD ["npm", "run", "dev"]