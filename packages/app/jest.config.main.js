const jestConfig = require("./jest.config.core")

module.exports = {
  ...jestConfig,
  testMatch: [
    "**/?(*.)+(test|spec).[jt]s?(x)",
  ],
  testPathIgnorePatterns: [
    ...jestConfig.testPathIgnorePatterns,
    "components",
    "actions",
    "<rootDir>/src/contact-support",
    "<rootDir>/src/__deprecated__/renderer",
    "<rootDir>/src/contacts/helpers",
    "<rootDir>/src/analytic-data-tracker/helpers",
    "<rootDir>/src/__deprecated__/context-menu"
  ],
  testEnvironment: "node"
}
