FROM node:alpine
RUN apk add g++ make python
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
