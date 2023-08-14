import { build } from 'esbuild';
import { glob } from 'glob';

const entryPoints = glob.sync('./lib/**/*.ts', {
  ignore: ['./lib/**/*.test.ts'],
});

build({
  entryPoints: [...entryPoints],
  platform: 'node',
  format: 'cjs',
  sourcemap: true,
  outdir: '.dist',
}).catch(() => process.exit(1));
