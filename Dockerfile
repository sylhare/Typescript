FROM node:26-slim as base

ENV HOME=/home/node
WORKDIR /app
RUN adduser node root && chown node:root /app $HOME && chmod g=u /app $HOME

###

FROM base as production

ARG NODE_ENV=production
USER node:root

COPY --chown=node:root package.json package-lock.json tsconfig.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:root src ./src
COPY --chown=node:root resources ./resources

RUN npm run build

ENTRYPOINT ["node"]
CMD ["dist/index.js"]

###

FROM base as ci

RUN apt update && apt install -y libcurl4
USER node:root

COPY --chown=node:root package.json package-lock.json tsconfig.json jest.config.ts eslint.config.cjs ./
RUN npm ci && npm cache clean --force

COPY --chown=node:root src ./src
COPY --chown=node:root resources ./resources
COPY --chown=node:root tests ./tests

ENTRYPOINT ["npm"]
CMD ["test"]
