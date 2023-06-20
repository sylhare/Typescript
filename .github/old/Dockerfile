FROM node:16-slim as base

ENV HOME=/home/node
WORKDIR /app
RUN adduser node root && chown node:root /app $HOME && chmod g=u /app $HOME

###

FROM base as production

ARG NODE_ENV=production
USER node:root

COPY --chown=node:root package.json package-lock.json tsconfig.json ./
RUN npm ci --only=production && npm cache clean --force

COPY --chown=node:root src ./src
COPY --chown=node:root resources ./resources

RUN npm run build

ENTRYPOINT ["node"]
CMD ["dist/index.js"]

###

FROM base as ci

RUN apt update && apt install -y libcurl4
USER node:root

COPY --chown=node:root package.json package-lock.json tsconfig.json jest.config.json .eslintrc.yml ./
RUN npm ci && npm cache clean --force

COPY --chown=node:root src ./src
COPY --chown=node:root resources ./resources
COPY --chown=node:root test ./test

ENTRYPOINT ["npm"]
CMD ["test"]
