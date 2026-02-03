import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import spellcheck from 'eslint-plugin-spellcheck'
import unusedImports from 'eslint-plugin-unused-imports'

const eslintConfig = [
  {
    ignores: ['node_modules/**', 'amplify/**', '.next/**', 'dist/**', 'build/**']
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      'unused-imports': unusedImports,
      import: await import('eslint-plugin-import').then(m => m.default || m),
      spellcheck,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'spellcheck/spell-checker': 'off',
      'import/no-anonymous-default-export': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { args: 'after-used', argsIgnorePattern: '^_' },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'max-lines': [
        'error',
        {
          max: 250,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
    },
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    plugins: {
      'unused-imports': unusedImports,
      import: await import('eslint-plugin-import').then(m => m.default || m),
      spellcheck,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'spellcheck/spell-checker': 'off',
      'import/no-anonymous-default-export': 'warn',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'max-lines': [
        'error',
        {
          max: 250,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
    },
  },
]

export default eslintConfig


