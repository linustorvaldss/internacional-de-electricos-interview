FROM node:20-alpine AS builder
WORKDIR /usr/src/app
ARG DATABASE_URL=postgresql://postgres:postgres@postgres:5432/dane
ENV DATABASE_URL=${DATABASE_URL}
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate --schema=prisma/schema.prisma
RUN npm run build

FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/prisma.config.ts ./prisma.config.ts
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy --config=prisma.config.ts --schema=prisma/schema.prisma && node dist/src/main.js"]