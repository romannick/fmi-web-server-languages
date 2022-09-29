FROM node:16.15.1-alpine as builder

WORKDIR /app

COPY . .



ARG APP
ARG ENV


ENV APP ${APP}
ENV ENV ${ENV}

RUN ls -alhtr && pwd

RUN apk --no-cache add --virtual .builds-deps build-base python3


RUN npm install nx -g && \
    npm install
RUN  nx build ${APP} --configuration=production

FROM node:16.15.1-alpine
WORKDIR /app

ARG APP
ARG ENV


ENV APP ${APP}
ENV ENV ${ENV}

COPY --from=builder  /app/ ./


RUN ls -alhtr && pwd

CMD npm start ${APP} --prod
