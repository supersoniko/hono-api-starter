import { BuildOptions, build, context } from 'esbuild';
import { glob } from 'glob';

const entryPoints = glob.sync('./lib/**/*.ts', {
  ignore: ['./lib/**/*.test.ts'],
});

const buildConfig = {
  entryPoints: [...entryPoints, './index.ts'],
  platform: 'node',
  format: 'cjs',
  sourcemap: true,
  outdir: '.dist',
} as BuildOptions;

async function buildAndWatch() {
  const ctx = await context(buildConfig);
  await ctx.watch();

  // eslint-disable-next-line no-console
  console.log('ESBuild: Watching error-handling library for changes');
}

const args = process.argv.slice(2);

if (args[0] === '--watch') {
  buildAndWatch().catch(() => process.exit(1));
} else {
  build(buildConfig).catch(() => process.exit(1));
}
