const esbuild = require('esbuild');
const { esbuildPluginPino } = require('@hono-starter-api/esbuild-plugin-pino');

esbuild
  .build({
    entryPoints: ['src/entry-points/api/server.ts'],
    platform: 'node',
    sourcemap: true,
    bundle: true,
    format: 'cjs',
    outdir: '.dist',
    plugins: [esbuildPluginPino({ transports: ['pino-pretty'] })],
  })
  .catch(() => process.exit(1));
