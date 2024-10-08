FROM node:22-alpine AS base

ARG NEXT_PUBLIC_PROJECT_ID=none
ENV NEXT_PUBLIC_PROJECT_ID $NEXT_PUBLIC_PROJECT_ID

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
COPY . .
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# If 'public' is part of the source and not dynamically generated, copy it directly
COPY ./app/public ./public

# Copy other necessary build artifacts and dependencies
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# Add this line to copy next.config.js
COPY --from=builder /app/next.config.mjs ./next.config.mjs  

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
