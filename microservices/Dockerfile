FROM node:14.16.0-slim

ARG APP
ENV APP ${APP}

WORKDIR /app
COPY ./dist/apps/${APP}/ ./
COPY ./package.json/ ./
COPY ./apps/${APP}/.env ./

RUN npm install --global npm
RUN npm install

CMD node /app/main.js
