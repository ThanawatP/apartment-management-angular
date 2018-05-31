# Stage 0, based on Node.js, to build Angular
FROM node:8.1.1 as node

ENV NODE_ENV dev
ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production && npm install --dev
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN chmod +x build.sh
RUN ["./build.sh"]

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.13
COPY --from=node /usr/src/app/dist/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
