module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Transpile JS and JSX files
  },
  testEnvironment: "jsdom", // Simulate browser environment for React
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'], // Ensure this points to the correct setupTests.js file
};