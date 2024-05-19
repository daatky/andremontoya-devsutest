import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx|html)$': 'jest-preset-angular',
  },
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
    }
  },
  transformIgnorePatterns: ['node_modules/(?!@angular|@ngx-translate)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/app/core/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@presentation/(.*)$': '<rootDir>/src/app/presentation/$1',
    '^@domain/(.*)$': '<rootDir>/src/app/domain/$1',
    '^@environment/(.*)$': '<rootDir>/src/app/environments/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts',
    '!src/polyfills.ts',
    '!src/test.ts',
    '!src/**/*.module.ts',
    '!src/**/*.array.ts',
    '!src/**/*.actions.ts',
    '!src/environments/**',
  ],
  coverageReporters: ['html'],
};

export default config;
