# Hono API Starter

🚀 Modern DX friendly starter for Node.js/[Hono](https://github.com/honojs/hono) APIs with the focus on simplicity and robustness.

## Features

- ✨ Node 18
- 🔹 TypeScript 5
- ❤️ Monorepo setup with Turbo and npm workspaces
- 🔥 Auto reloading support for monorepo setup
- 🚀 Turbo pipeline to run tasks
- ✅ Type and runtime safe environment variables
- 🔒 Secure headers by default for APIs
- 🛡️CORS
- 📚 Robust logger (credits to Practica)
- 🆔 Unique request ID (credits to Practica)
- 🚫 Strict linting and type checking rules
- 🐶 Husky for Git Hooks
- 📔 Lint git commit with Commitlint
- 🦺 Unit Testing with native Node.js test runner
- 📦 Optimized esbuild production artifact
- 🐳 Production ready Dockerfile for deployment

## General setup

Manage your Node.js version automatically with [Volta](https://volta.sh)

### Clone the repository

```bash
git clone https://github.com/supersoniko/hono-api-starter.git
```

### Install dependencies

```bash
npm i
```

### Cat Topia Application

#### Development Server

```
npm run turbo:start:dev:cat-topia
```

```bash
open http://localhost:8000
```

#### Production simulation

```bash
# Only build JavaScript output
npm run turbo:build:app:cat-topia
# Build and run JavaScript output
npm run turbo:start:app:cat-topia
```

```bash
open http://localhost:8000
```

#### Production deploy to Fly

This will require [Fly.io CLI](https://fly.io/docs/hands-on/install-flyctl/) to be installed.

```bash
flyctl launch
```

```bash
flyctl deploy
```

### API Specification

The API specification is written in [RapidAPI/Paw](https://paw.cloud/).

The specification can be be found in the root folder `hono-starter-api-spec.paw`.

### Debugging with VS Code

#### Start any application in `debug` mode

```
npm run turbo:start:debug:cat-topia
```

#### Attach debugger in VS Code

Go to the Command Pallete (⇧+⌘+P on macOS), and search for the action "Debug: Attach to Node process".

Choose the node process that looks like this: `node --inspect -r ts-node/register -r tsconfig-paths/register ./src/entry-points/api/server.ts`.

View the [VS Code Debug Actions documentation](https://code.visualstudio.com/Docs/editor/debugging#_debug-actions) for more information regarding the use of their debugger.
