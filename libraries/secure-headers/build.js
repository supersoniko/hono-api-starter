const esbuild = require('esbuild');
const glob = require('glob');

const entryPoints = glob.sync('./lib/**/*.ts', {
  ignore: ['./lib/**/*.test.ts'],
});

const buildConfig = {
  entryPoints: [...entryPoints, './index.ts'],
  platform: 'node',
  format: 'cjs',
  sourcemap: true,
  outdir: '.dist',
};

async function buildAndWatch() {
  let ctx = await esbuild.context(buildConfig);
  await ctx.watch();
  console.log('ESBuild: Watching configuration-provider library for changes');
}

const args = process.argv.slice(2);

if (args[0] === '--watch') {
  buildAndWatch().catch(() => process.exit(1));
} else {
  esbuild.build(buildConfig).catch(() => process.exit(1));
}
