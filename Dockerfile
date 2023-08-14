# DOCKER BUILD

FROM node:16-slim As build

WORKDIR /usr/src/app

# Copy required files
COPY ./package.json ./
COPY ./src ./src
COPY ./index.js ./
COPY ./.env ./.env

# Install app dependencies
RUN npm install

ENV PORT 3000

# Start the server
CMD [ "npm", "run", "start" ]