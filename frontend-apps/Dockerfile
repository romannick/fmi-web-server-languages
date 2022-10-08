FROM node:16.15.1-alpine

ARG APP
ARG GATEWAY_URL

ENV APP ${APP}
ENV GATEWAY_URL ${GATEWAY_URL}

RUN apk --no-cache add --virtual .builds-deps build-base python3

WORKDIR /app
COPY ./dist/apps/${APP}/ ./

RUN npm install --global npm@8.11.0
RUN npm install

CMD npm start --prod
