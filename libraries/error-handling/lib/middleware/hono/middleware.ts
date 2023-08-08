import { ErrorHandler } from 'hono';
import { errorHandler } from '../../error-handler';

export const handleHTTPError = (): ErrorHandler => (error, c) => {
  // ✅ Best Practice: Pass all error to a centralized error handler so they get treated equally
  const appError = errorHandler.handleError(error);

  return c.json(
    {
      code: appError.code,
      errorType: appError.errorType,
      fieldValidationIssues: appError.fieldValidationIssues,
    },
    appError.HTTPStatus || 500
  );
};
