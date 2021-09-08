module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: ['<rootDir>/tests/unit/index.ts'],
  testMatch: [
    '<rootDir>/tests/unit/**/*.(test|spec).(js|jsx|ts|tsx)',
    '<rootDir>/src/**/*.(test|spec).(js|jsx|ts|tsx)'
  ],
  coverageReporters: [
    'cobertura',
    'lcov'
  ],
  coveragePathIgnorePatterns: [
    'main.ts',
    'src/plugins/*',
    'src/store/index.ts',
    'src/router/index.ts',
    'src/main.ts',
    'src/registerServiceWorker.ts'
  ]
}
