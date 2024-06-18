module.exports = {
  root: true,
  extends: ['prettier'],
  plugins: ['@stylistic', 'prettier'],
  rules: {
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    '@stylistic/indent': ['error', 2],
    '@stylistic/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: 'function', next: 'function' },
    ],
    'prettier/prettier': 'error',
  },
}
