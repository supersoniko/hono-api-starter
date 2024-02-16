import { MiddlewareHandler } from 'hono';
import { REQUEST_ID_HEADER, generateRequestId } from '../constant';
import { requestContext } from '../../context';

/**
 * This is a Hono middleware that:
 * - Generate/Use request id (depending on if you already have one in the request header)
 * - Add it to the request context
 *
 * **Important:** this should be your first middleware
 */
export const addRequestIdHonoMiddleware =
  (): MiddlewareHandler => async (c, next) => {
    let requestId = c.get(REQUEST_ID_HEADER);

    if (!requestId) {
      requestId = generateRequestId();
      c.req.raw.headers.set(REQUEST_ID_HEADER, REQUEST_ID_HEADER);
    }

    c.res.headers.set(REQUEST_ID_HEADER, requestId);

    const currentContext = requestContext().getStore();

    if (currentContext) {
      // Append to the current context
      currentContext.requestId = requestId;
      await next();
      return;
    }

    await requestContext().run({ requestId }, async () => await next());
  };
