FROM node:alpine

WORKDIR /api

COPY . .

RUN npm i

EXPOSE 3333

CMD ["npm", "run", "start:dev"]