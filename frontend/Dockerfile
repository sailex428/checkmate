FROM node:24-alpine AS build
LABEL authors="sailex"
ENV TZ=Europe/Berlin

COPY . .

RUN npm install
RUN npm run build

FROM nginx
COPY --from=build /dist /usr/share/nginx/html
