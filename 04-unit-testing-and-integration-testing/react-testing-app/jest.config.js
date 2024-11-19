module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
      },
      setupFilesAfterEnv: ['<rootDir>/setupTests.js'],

}