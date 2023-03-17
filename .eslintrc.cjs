module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc'],
  ignorePatterns: ['*.cjs'],
  settings: {},
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  rules: {
    'tsdoc/syntax': 'warn',
    'max-classes-per-file': 'off',
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
};
