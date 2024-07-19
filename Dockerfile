# specify a base image
FROM node:18-alpine

WORKDIR /app

# install some independcies
COPY ./package.json ./
RUN npm install
COPY ./ ./

# default command
CMD [ "npm", "run", "start" ]