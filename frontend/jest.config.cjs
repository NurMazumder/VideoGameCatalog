module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testEnvironment: "jsdom",
  testMatch: [
    "**/src/testing/UnitTest/**/*.test.js",
    "**/src/testing/IntegrationTest/**/*.test.js",
    "**/src/testing/EndtoEndTest/**/*.test.js",
  ],
};
