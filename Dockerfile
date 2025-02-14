FROM node:14-alpine3.17
#FROM node:14
# Set the working directory.
RUN mkdir /app
WORKDIR /app

COPY test.js ./test.js
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make pkgconfig pixman-dev cairo-dev pango-dev libjpeg-turbo-dev giflib-dev
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.15/community"  >> /etc/apk/repositories
RUN apk add --no-cache openssl

EXPOSE 80

CMD [ "node", "app/test.js" ]
