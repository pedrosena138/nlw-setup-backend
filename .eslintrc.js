module.exports = {
  env: {
    node: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended'
  ],
  ignorePatterns: ['.eslintrc.js'],
  overrides: [
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  root: true,
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    'no-unexpected-multiline': 'off'
  }
}
