FROM node:24-alpine AS build
LABEL authors="sailex"
ENV TZ=Europe/Berlin

COPY /dist .
COPY default.conf .

#RUN npm i
#RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

FROM nginx
COPY --from=build /dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
