module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'plugin:prettier/recommended'
  ],
  rules: {
    // 'import/order': 'off',
    // 'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // '@typescript-eslint/no-explicit-any': 'off',
    // 'import/extensions': 'off',
    // 'import/no-extraneous-dependencies': 'off'
  },
  root: true,

  ignorePatterns: ['.eslintrc.js', 'webpack.config.js', 'build.js'],
}
