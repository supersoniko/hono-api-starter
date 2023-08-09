import { esbuildPluginPino } from '@hono-starter-api/esbuild-plugin-pino';
import { build } from 'esbuild';

build({
  entryPoints: ['src/entry-points/api/server.ts'],
  platform: 'node',
  sourcemap: true,
  bundle: true,
  format: 'cjs',
  outdir: '.dist',
  plugins: [esbuildPluginPino({ transports: ['pino-pretty'] })],
}).catch(() => process.exit(1));
