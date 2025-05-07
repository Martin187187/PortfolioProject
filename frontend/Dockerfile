# Build React app
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve static files with nginx
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]