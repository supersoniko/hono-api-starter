import { MiddlewareHandler } from 'hono';

export const xContentTypeOptions = (): MiddlewareHandler => async (c, next) => {
  await next();
  c.header('X-Content-Type-Options', 'nosniff');
};
