# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
# --------------> The build image
FROM node:20.11.0-bullseye AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ARG NPM_TOKEN
WORKDIR /usr/src/monorepo
COPY . /usr/src/monorepo/
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc && \
   npm ci && \
   rm -f .npmrc
RUN npm run turbo:build:app:cat-topia

# --------------> The production image
FROM node:20.11.0-bullseye-slim

ENV NODE_ENV production
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /usr/src/monorepo
COPY --chown=node:node --from=build /usr/src/monorepo/apps/cat-topia/.dist /usr/src/monorepo/.dist
CMD ["dumb-init", "node", ".dist/server.js"]