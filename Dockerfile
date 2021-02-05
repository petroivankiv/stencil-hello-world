FROM node:12.18.1 as build
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/www/ /usr/share/nginx/html
