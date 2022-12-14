FROM node:18-alpine AS deps

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./

RUN npm ci


FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


FROM nginx:1.23.3-alpine AS runner

ENV NODE_ENV=PRODUCTION

COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 80
