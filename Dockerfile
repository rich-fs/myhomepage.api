# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application's code to the container
COPY . .

# Set the command to run the application with nodemon
CMD ["npm", "run", "nodemon"]