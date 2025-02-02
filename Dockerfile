FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Set the environment to development (or production if needed)
ENV NODE_ENV development

# Make sure the app is accessible from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]