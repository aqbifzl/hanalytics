FROM node:18-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public

RUN mkdir .next

run mkdir -p ./node_modules/geoip-lite/data/
COPY --from=builder /app/node_modules/geoip-lite/data/ ./node_modules/geoip-lite/data/
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/migrate_and_start.sh ./
COPY --from=builder /app/prisma/ ./prisma/

EXPOSE 3000

ENV PORT 3000

CMD ["sh", "/app/migrate_and_start.sh"]
