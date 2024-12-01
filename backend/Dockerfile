FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG MONGO_URL
ENV MONGO_URL=${MONGO_URL}

EXPOSE 5000

CMD ["node", "server.js"]   
