FROM node:22.11.0

WORKDIR /usr/src/app

COPY *.json ./
COPY yarn.lock ./yarn.lock

RUN yarn install

RUN yarn build

COPY . .

EXPOSE 3000

CMD [ "yarn", "start", "dev" ]
