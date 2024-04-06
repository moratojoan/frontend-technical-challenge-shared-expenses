# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.10.0
FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm i

CMD ["ng", "serve"]
