FROM node AS build-env
ADD . /app
WORKDIR /app
#RUN npm install
RUN npm ci --only=production
FROM gcr.io/distroless/nodejs:10
COPY --from=build-env /app /app
WORKDIR /app/src
EXPOSE 8080
CMD ["index.js"]