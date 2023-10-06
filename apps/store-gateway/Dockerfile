# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /nest-apis
COPY dist/apps/store-gateway .
COPY package.json yarn.lock ./
RUN yarn
CMD node ./main.js
EXPOSE 3000