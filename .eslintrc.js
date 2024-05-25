const path = require('path');

module.exports = {
  env: {
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
    'prettier',
  ],
  ignorePatterns: [
    '**/dist/*',
    '**/node_modules/*',
    '.eslintrc.js',
    'build.js',
    'build.ts',
    'build-lib.ts',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      path.resolve(__dirname, './libraries/tsconfig/tsconfig.json'),
      path.resolve(__dirname, './apps/cat-topia/tsconfig.json'),
      path.resolve(
        __dirname,
        './libraries/configuration-provider/tsconfig.json'
      ),
      path.resolve(__dirname, './libraries/error-handling/tsconfig.json'),
      path.resolve(__dirname, './libraries/esbuild-plugin-pino/tsconfig.json'),
      path.resolve(__dirname, './libraries/logger/tsconfig.json'),
      path.resolve(__dirname, './libraries/random-cat-name/tsconfig.json'),
      path.resolve(__dirname, './libraries/request-context/tsconfig.json'),
      path.resolve(__dirname, './libraries/secure-headers/tsconfig.json'),
    ],
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': ['error', { allow: ['time', 'timeEnd'] }],
    // https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/returningpromises.md
    'no-return-await': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unsafe-assignment': ['error'],
    '@typescript-eslint/no-unsafe-argument': ['error'],
    '@typescript-eslint/no-unsafe-call': ['error'],
    '@typescript-eslint/no-unsafe-member-access': ['error'],
  },
};
