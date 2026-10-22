# syntax=docker/dockerfile:1.7

ARG VITE_PLUS_VERSION=0.2.8
ARG NODE_VERSION=24.22.1

FROM ghcr.io/voidzero-dev/vite-plus:${VITE_PLUS_VERSION} AS builder

WORKDIR /app

COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version ./
COPY --chown=vp:vp patches ./patches
RUN vp install --frozen-lockfile

COPY --chown=vp:vp . .

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_ARCVIEWER_URL
ARG NEXT_PUBLIC_LUDUS_URL
ARG DEBUG_REACT_SCAN
ARG DEBUG_BREAKPOINTS
ARG DEBUG_PAGE_BACKGROUND
ARG API_URL

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_ARCVIEWER_URL=${NEXT_PUBLIC_ARCVIEWER_URL}
ENV NEXT_PUBLIC_LUDUS_URL=${NEXT_PUBLIC_LUDUS_URL}
ENV DEBUG_REACT_SCAN=${DEBUG_REACT_SCAN}
ENV DEBUG_BREAKPOINTS=${DEBUG_BREAKPOINTS}
ENV DEBUG_PAGE_BACKGROUND=${DEBUG_PAGE_BACKGROUND}
ENV API_URL=${API_URL}
ENV NODE_ENV=production

RUN vp build

FROM node:${NODE_VERSION}-bookworm-slim AS runner

WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_ARCVIEWER_URL
ARG NEXT_PUBLIC_LUDUS_URL
ARG DEBUG_REACT_SCAN
ARG DEBUG_BREAKPOINTS
ARG DEBUG_PAGE_BACKGROUND
ARG API_URL

ENV NODE_ENV=production \
    PORT=4000 \
    HOSTNAME=0.0.0.0 \
    API_URL=${API_URL} \
    NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_ARCVIEWER_URL=${NEXT_PUBLIC_ARCVIEWER_URL} \
    NEXT_PUBLIC_LUDUS_URL=${NEXT_PUBLIC_LUDUS_URL} \
    DEBUG_REACT_SCAN=${DEBUG_REACT_SCAN} \
    DEBUG_BREAKPOINTS=${DEBUG_BREAKPOINTS} \
    DEBUG_PAGE_BACKGROUND=${DEBUG_PAGE_BACKGROUND}

COPY --from=builder --chown=node:node /app/.output ./.output

USER node

EXPOSE 4000

HEALTHCHECK --interval=10s --timeout=3s --start-period=20s --retries=5 \
  CMD node -e "const socket = require('node:net').connect(process.env.PORT || 4000, '127.0.0.1'); socket.setTimeout(2000); socket.on('connect', () => { socket.destroy(); process.exit(0) }); socket.on('timeout', () => { console.error('listener timed out'); socket.destroy(); process.exit(1) }); socket.on('error', (error) => { console.error(error.message); process.exit(1) })"

CMD ["node", ".output/server/index.mjs"]
