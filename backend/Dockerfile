# ==========================================
# MULTI-STAGE DOCKER BUILD — ALCHEMIST BACKEND
# ==========================================
FROM node:20-alpine AS base
WORKDIR /usr/src/app

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --omit=dev

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=5000
WORKDIR /usr/src/app

# Create non-root user and directories
RUN mkdir -p database logs storage/attachments && chown -R node:node /usr/src/app

USER node

COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

EXPOSE 5000

CMD ["node", "server.js"]
