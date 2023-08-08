import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from '@hono-starter-api/logger';
import { addRequestIdHonoMiddleware } from '@hono-starter-api/request-context/middleware';

import { env } from '@app/env';
import {
  errorHandler,
  handleHTTPError,
} from '@hono-starter-api/error-handling';
import { cors } from 'hono/cors';
import {
  strictTransportSecurity,
  xContentTypeOptions,
} from '@hono-starter-api/secure-headers';
import { defineRoutes } from './routes';

const { PORT } = env;

const app = new Hono();

logger.configureLogger(
  {
    prettyPrint: env.PRETTY_PRINT === 'YES',
  },
  true
);

app.use('*', addRequestIdHonoMiddleware());

app.onError(handleHTTPError());

// Set the CORS configuration as strictly as possible for your frontend
// https://hono.dev/middleware/builtin/cors
app.use('*', cors());

app.use('*', strictTransportSecurity());
app.use('*', xContentTypeOptions());

defineRoutes(app);

const connection = serve({
  ...app,
  port: PORT,
});

errorHandler.listenToErrorEvents(connection);

logger.info(`Running server on http://localhost:${PORT}`);
