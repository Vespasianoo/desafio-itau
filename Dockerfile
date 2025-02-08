FROM node:alpine

WORKDIR /api

COPY . .

RUN npm i

EXPOSE 5002

CMD ["npm", "run", "start:dev"]