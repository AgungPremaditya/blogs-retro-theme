#Stage 1: Build the application
FROM node:lts-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npx next build

EXPOSE 3000

CMD ["npm", "run", "dev"]