import { logger } from '@hono-starter-api/logger';
import { MiddlewareHandler } from 'hono';

const DEFAULT_MAX_AGE = 180 * 24 * 60 * 60;

export type StrictTransportSecurityOptions = {
  maxAge?: number;
  includeSubDomains?: boolean;
  preload?: boolean;
};

function parseMaxAge(value: number = DEFAULT_MAX_AGE): number {
  if (value >= 0 && Number.isFinite(value)) {
    return Math.floor(value);
  }
  throw new Error(
    `Strict-Transport-Security: ${JSON.stringify(
      value
    )} is not a valid value for maxAge. Please choose a positive integer.`
  );
}

function getHeaderValueFromOptions(
  options: Readonly<StrictTransportSecurityOptions>
): string {
  if ('maxage' in options) {
    throw new Error(
      'Strict-Transport-Security received an unsupported property, `maxage`. Did you mean to pass `maxAge`?'
    );
  }
  if ('includeSubdomains' in options) {
    logger.warning(
      'Strict-Transport-Security middleware should use `includeSubDomains` instead of `includeSubdomains`. (The correct one has an uppercase "D".)'
    );
  }

  const directives: string[] = [`max-age=${parseMaxAge(options.maxAge)}`];

  if (options.includeSubDomains === undefined || options.includeSubDomains) {
    directives.push('includeSubDomains');
  }

  if (options.preload) {
    directives.push('preload');
  }

  return directives.join('; ');
}

export const strictTransportSecurity =
  (options: Readonly<StrictTransportSecurityOptions> = {}): MiddlewareHandler =>
  async (c, next) => {
    await next();
    const headerValue = getHeaderValueFromOptions(options);
    c.header('Strict-Transport-Security', headerValue);
  };
