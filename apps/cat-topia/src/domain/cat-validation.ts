import { AppError, AppErrorType } from '@hono-starter-api/error-handling';
import { CatCreationInput, catCreationSchema } from './cat-schema';
import { AppErrorCode } from './error-code';

export function isValidCatCreationInput(
  input: unknown
): asserts input is CatCreationInput {
  try {
    catCreationSchema.parse(input);
  } catch (error) {
    throw new AppError(
      'CatValidationError',
      'Zod validation error on cat creation input',
      AppErrorType.Validation,
      AppErrorCode.Validation_1,
      error
    );
  }
}
