FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon
RUN npm install -g ts-node

EXPOSE 8000

CMD ["npm", "run", "start"]