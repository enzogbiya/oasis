FROM node:16.20.0

RUN apt-get update && apt-get install -y wait-for-it

WORKDIR /


COPY package.json .

RUN npm i

COPY . .

EXPOSE 3001

CMD ["wait-for-it", "database:5432", "--", "node", "server.js"]
