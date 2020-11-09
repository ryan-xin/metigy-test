FROM node:10-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install nodemon -g
COPY package-lock.json /app
COPY . /app

RUN npm install

CMD ["npm", "start"]