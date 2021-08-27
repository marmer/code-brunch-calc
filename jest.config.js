module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: ['<rootDir>/tests/unit/index.ts'],
  testMatch: ['<rootDir>/tests/unit/**/*.(test|spec).(js|jsx|ts|tsx)']
}
