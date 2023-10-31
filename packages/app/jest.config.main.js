const jestConfig = require("./jest.config.core")

module.exports = {
  ...jestConfig,
  testMatch: [
    "**/?(*.)+(test|spec).[jt]s?(x)",
  ],
  testPathIgnorePatterns: [
    ...jestConfig.testPathIgnorePatterns,
    "components",
    "<rootDir>/src/contact-support",
    "<rootDir>/src/__deprecated__/renderer"
  ],
  testEnvironment: "node"
}
