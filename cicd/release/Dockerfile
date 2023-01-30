FROM node:16-alpine

ENV TZ=Asia/Tokyo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app
COPY package.deps.json package.json
COPY ["yarn.lock", "./"]
RUN yarn install
COPY . .
RUN yarn build
ENTRYPOINT ["yarn", "start"]
