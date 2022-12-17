FROM node:18-alpine

WORKDIR /frontend/

COPY package.json /frontend/

RUN yarn

COPY . .

CMD ["yarn", "start"]