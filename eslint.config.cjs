const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const jest = require('eslint-plugin-jest');

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      jest,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...jest.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-extra-non-null-assertion': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    }
  },
  {
    files: ['**/*.ts', '**/*.js', '**/*.cjs'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    rules: {
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'no-unexpected-multiline': ['error'],
      'no-irregular-whitespace': 'error',
      'func-call-spacing': ['error', 'never'],
      'array-bracket-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'template-curly-spacing': ['error', 'never'],
      'keyword-spacing': ['error'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'space-unary-ops': ['error', { words: true, nonwords: false }],
      'space-infix-ops': ['error'],
      'key-spacing': ['error', { mode: 'strict' }],
      'max-len': ['error', { code: 150 }],
      'eqeqeq': ['error', 'smart'],
      'prefer-const': ['error'],
      'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
      'semi': ['error', 'always'],
      'no-extra-semi': 'error',
      'comma-dangle': ['warn', 'only-multiline'],
      'object-shorthand': ['error', 'always'],
      'no-useless-rename': ['error'],
      'max-depth': ['error', 3],
      'no-unneeded-ternary': 'error',
      'no-nested-ternary': 'warn',
    }
  }
];