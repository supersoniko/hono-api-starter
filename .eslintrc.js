module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
    'prettier',
  ],
  ignorePatterns: ['**/dist/*', '**/node_modules/*', 'build.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: '2021',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/tests/**', '**/test/**', '**/build.ts'] },
    ],
    'no-console': ['error', { allow: ['time', 'timeEnd'] }],
    // not sure why we need this if Typescript already enforces it.
    // If we want to enable these rules, we need use: eslint-import-resolver-typescript
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    // https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/returningpromises.md
    'no-return-await': 'off',
    // Turn it back on after this being fixed: https://github.com/eslint/eslint/issues/15617
    'no-restricted-exports': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
};
