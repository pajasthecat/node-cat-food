FROM node:10

WORKDIR /usr

COPY package*.json ./

RUN npm install

COPY . .

Expose 3000

CMD ["npm", "start"]