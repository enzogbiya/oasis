FROM node:16.20.0

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
