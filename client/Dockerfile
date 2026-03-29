# ---- Build deps ----
FROM node:20-alpine AS deps
WORKDIR /client
RUN apk add --no-cache libc6-compat \
 && corepack enable && corepack prepare pnpm@9.12.0 --activate
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# ---- Build app ----
FROM node:20-alpine AS build
WORKDIR /client
RUN apk add --no-cache libc6-compat \
 && corepack enable && corepack prepare pnpm@9.12.0 --activate
COPY --from=deps /client/node_modules ./node_modules
COPY . .
RUN pnpm build \
 && pnpm prune --prod

# ---- Runtime ----
FROM node:20-alpine
WORKDIR /client
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache libc6-compat
COPY --from=build /client/package.json ./package.json
COPY --from=build /client/pnpm-lock.yaml* ./
COPY --from=build /client/node_modules ./node_modules
COPY --from=build /client/.next ./.next
COPY --from=build /client/public ./public
COPY --from=build /client/next.config.* ./
EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000"]
