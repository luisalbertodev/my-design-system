FROM node:14-alpine AS build

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

USER node

WORKDIR /usr/src/node-app

COPY --chown=node:node . .

RUN npm install

RUN npm run build:storybook

EXPOSE 6006

CMD npm run storybook