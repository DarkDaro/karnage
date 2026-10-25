const sharedGlobals = {
  console: 'readonly',
  URL: 'readonly',
  URLSearchParams: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  performance: 'readonly',
  process: 'readonly',
  Buffer: 'readonly',
  fetch: 'readonly'
};

const browserGlobals = {
  ...sharedGlobals,
  window: 'readonly',
  document: 'readonly',
  location: 'readonly',
  localStorage: 'readonly',
  navigator: 'readonly',
  Image: 'readonly',
  AudioContext: 'readonly',
  webkitAudioContext: 'readonly',
  SpeechSynthesisUtterance: 'readonly',
  speechSynthesis: 'readonly',
  requestAnimationFrame: 'readonly',
  cancelAnimationFrame: 'readonly',
  addEventListener: 'readonly',
  innerWidth: 'readonly',
  innerHeight: 'readonly',
  devicePixelRatio: 'readonly'
};

const rules = {
  'no-undef': 'error',
  'no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none', varsIgnorePattern: '^_' }],
  'no-use-before-define': ['error', { functions: false, classes: false }],
  'no-unreachable': 'error',
  'no-dupe-keys': 'error',
  'no-dupe-args': 'error',
  'no-fallthrough': 'error',
  'no-self-assign': 'error',
  'no-cond-assign': 'error',
  'no-redeclare': 'error',
  'no-constant-binary-expression': 'warn',
  'no-compare-neg-zero': 'warn'
};

export default [
  {
    ignores: [
      'node_modules/**',
      'archive/**',
      'release/**',
      'src/legacy/**',
      'test-results/**',
      'assets/fonts/**'
    ]
  },
  {
    files: ['tools/**/*.mjs', 'tests/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: sharedGlobals
    },
    rules
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: browserGlobals
    },
    rules
  }
];
