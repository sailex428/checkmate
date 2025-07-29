FROM nginx
LABEL authors="sailex"
ENV TZ=Europe/Berlin

COPY dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
