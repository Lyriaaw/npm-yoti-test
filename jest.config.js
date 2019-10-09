module.exports = {
  roots: [
    '<rootDir>',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  snapshotSerializers: ['enzyme-to-json'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
