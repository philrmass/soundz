module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es2021': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'rules': {
    'comma-dangle': ['warn', 'always-multiline'],
    'comma-spacing': 'warn',
    'key-spacing': 'warn',
    'indent': ['warn', 2, { 'SwitchCase': 1 }],
    'linebreak-style': ['error', 'unix'],
    'no-unused-vars': 'warn',
    'object-curly-spacing': ['warn', 'always'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
  },
};
