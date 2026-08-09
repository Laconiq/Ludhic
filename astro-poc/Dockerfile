FROM node:22-alpine AS base

RUN corepack enable && corepack prepare pnpm@10.30.3 --activate

# --- Dependencies ---
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# --- Build ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# --- Production ---
# Sortie 100% statique : pas de serveur Node, pas de cache d'optimiseur
# d'images à faire survivre aux redéploiements (astro:assets traite les
# images au build, cf. src/lib/assetImages.ts). nginx sert dist/ tel quel.
FROM nginx:1.27-alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
