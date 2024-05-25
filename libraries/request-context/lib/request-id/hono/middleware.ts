import { MiddlewareHandler } from 'hono';
import { REQUEST_ID_HEADER, generateRequestId } from '../constant';
import { requestContext } from '../../context';

function isRequestIdDefined(requestId: unknown): requestId is string {
  return typeof requestId === 'string' && requestId.length > 0;
}

/**
 * Hono middleware to generate or use request ID and add it to the request context.
 *
 * **Important:** This should be your first middleware.
 */
export const addRequestIdHonoMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    const requestIdFromContext = c.get(REQUEST_ID_HEADER) as unknown;
    const requestId = isRequestIdDefined(requestIdFromContext)
      ? requestIdFromContext
      : generateRequestId();

    c.header(REQUEST_ID_HEADER, requestId);

    const currentContext = requestContext().getStore();

    if (currentContext) {
      currentContext.requestId = requestId;
      await next();
      return;
    }

    await requestContext().run({ requestId }, async () => await next());
  };
};
