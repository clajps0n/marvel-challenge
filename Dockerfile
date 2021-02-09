# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14.15.3 as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/out/ /usr/share/nginx/html