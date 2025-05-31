FROM node:22.16.0-alpine

WORKDIR /app

COPY . .

RUN npm install -g serve && npm install && npm run build:storybook

EXPOSE 6006

CMD ["serve", "-s", "build", "-l", "6006"]
