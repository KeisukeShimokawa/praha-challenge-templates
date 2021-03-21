module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/functions.ts',
    '**/functions.stub.ts',
    '**/functions.spy.ts',
  ],
  verbose: true,
};
