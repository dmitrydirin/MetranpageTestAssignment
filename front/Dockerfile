# syntax=docker/dockerfile:1

FROM node:18.14.0 as build-env
WORKDIR /src
COPY ./. ./

RUN npm install -g @angular/cli@16.2.1
RUN npm install
RUN ng build --configuration=production --output-hashing all --base-href /

FROM nginx:alpine
COPY --from=build-env /src/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-env /src/dist/front /usr/share/nginx/html/