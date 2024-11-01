FROM node:20

WORKDIR /app

COPY package.json .

COPY . .

RUN npm install

EXPOSE 5174

CMD ["npm", "run", "dev"]