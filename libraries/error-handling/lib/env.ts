import { createEnv } from '@hono-starter-api/configuration-provider';
import { z } from 'zod';

export const env = createEnv({
  server: {
    PRETTY_PRINT: z.union([z.literal('YES'), z.literal('NO')]),
  },
  /**
   * What object holds the environment variables at runtime.
   * Often `process.env` or `import.meta.env`
   */
  runtimeEnv: process.env,
});
