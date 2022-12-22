FROM node:16-alpine as package_json_process
RUN apk add jq
COPY ./package.json /tmp/package.original.json
RUN cat /tmp/package.original.json | jq '{dependencies: .dependencies, devDependencies: .devDependencies}' &> /tmp/package.json

FROM node:16-alpine
RUN apk add --update --no-cache tzdata && \
   cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
   echo 'Asia/Tokyo' > /etc/timezone && \
   apk del tzdata
WORKDIR /app
COPY ./yarn.lock /tmp/
COPY --from=package_json_process /tmp/package.json /tmp/package.json
RUN yarn install --cwd /tmp
RUN cp -a /tmp/node_modules ./node_modules
COPY . .
RUN yarn build
ENTRYPOINT ["yarn", "start"]
