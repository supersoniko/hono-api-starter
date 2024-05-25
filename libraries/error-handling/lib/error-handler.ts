import * as Http from 'http';
import * as util from 'util';
import { logger } from '@hono-starter-api/logger';
import { ZodError } from 'zod';

import { AppError, AppErrorType } from './app-error';
import { env } from './env';

let httpServerRef: Http.Server;

enum InternalErrorCodes {
  Server_0 = 'Server_0', // Error handler failed
  Server_1 = 'Server_1', // Error handler received an error of non Error type
  Server_2 = 'Server_2', // Error handler received an error of type Error and not AppErrror
}

logger.configureLogger(
  {
    prettyPrint: env.PRETTY_PRINT === 'YES',
  },
  true
);

const errorHandler = {
  // Listen to the global process-level error events
  listenToErrorEvents: (httpServer: Http.Server) => {
    httpServerRef = httpServer;
    process.on('uncaughtException', async (error) => {
      await errorHandler.handleError(error);
    });

    process.on('unhandledRejection', async (reason) => {
      await errorHandler.handleError(reason);
    });

    process.on('SIGTERM', async () => {
      logger.error(
        'App received SIGTERM event, try to gracefully close the server'
      );
      await terminateHttpServerAndExit();
    });

    process.on('SIGINT', async () => {
      logger.error(
        'App received SIGINT event, try to gracefully close the server'
      );
      await terminateHttpServerAndExit();
    });
  },

  handleError(errorToHandle: unknown): AppError {
    try {
      const appError: AppError = normalizeError(errorToHandle);
      logger.error(appError.message, appError);
      metricsExporter.fireMetric('error', { errorName: appError.name }); // fire any custom metric when handling error
      // A common best practice is to crash when an unknown error (non-trusted) is being thrown
      if (!appError.isTrusted) {
        terminateHttpServerAndExit();
      }

      return appError;
    } catch (handlingError: unknown) {
      // Not using the logger here because it might have failed
      const message =
        'The error handler failed, here are the handler failure and then the origin error that it tried to handle';
      process.stdout.write(message);
      process.stdout.write(JSON.stringify(handlingError));
      process.stdout.write(JSON.stringify(errorToHandle));

      return new AppError(
        'Error handler failure',
        message,
        AppErrorType.Unexpected,
        InternalErrorCodes.Server_0
      );
    }
  },
};

const terminateHttpServerAndExit = async () => {
  // maybe implement more complex logic here (like using 'http-terminator' library)
  if (httpServerRef) {
    await httpServerRef.close();
  }
  process.exit();
};

const isValidationZodError = (
  error: unknown
): error is AppError<AppErrorType.Validation, ZodError> =>
  error instanceof AppError &&
  error.errorType === AppErrorType.Validation &&
  error.cause instanceof Error &&
  'issues' in error.cause;

// The input might won't be 'AppError' or even 'Error' instance, the output of this function will be - AppError.
const normalizeError = (errorToHandle: unknown): AppError => {
  if (isValidationZodError(errorToHandle)) {
    errorToHandle.fieldValidationIssues = errorToHandle.cause?.issues;
    errorToHandle.HTTPStatus = 400;

    return errorToHandle;
  }
  if (errorToHandle instanceof AppError) {
    return errorToHandle as AppError;
  }
  if (errorToHandle instanceof Error) {
    const appError = new AppError(
      errorToHandle.name,
      errorToHandle.message,
      AppErrorType.Unknown,
      InternalErrorCodes.Server_2
    );
    appError.stack = errorToHandle.stack;
    return appError;
  }
  // meaning it could be any type,
  const inputType = typeof errorToHandle;
  return new AppError(
    'general-error',
    `Error Handler received a none error instance with type - ${inputType}, value - ${util.inspect(
      errorToHandle
    )}`,
    AppErrorType.Unknown,
    InternalErrorCodes.Server_1
  );
};

// This simulates a typical monitoring solution that allow firing custom metrics when
// like Prometheus, DataDog, CloudWatch, etc
const metricsExporter = {
  fireMetric: async (name: string, labels: object) => {
    logger.info('In real production code I will really fire metrics', {
      name,
      labels,
    });
  },
};

export { errorHandler, metricsExporter };
