FROM node:19-alpine3.16 as build

WORKDIR /app/quotesfrontend
COPY ./quotesfrontend/package.json ./
COPY ./quotesfrontend/package-lock.json ./
RUN npm ci --silent
COPY ./quotesfrontend/ ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/quotesfrontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]