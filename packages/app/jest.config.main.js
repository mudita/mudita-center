const jestConfig = require("./jest.config.core")

module.exports = {
  ...jestConfig,
  testMatch: ["<rootDir>/src/**/*(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: [
    ...jestConfig.testPathIgnorePatterns,
    "components",
    "actions",
    "hooks",
    "<rootDir>/src/contact-support",
    "<rootDir>/src/__deprecated__/renderer",
    "<rootDir>/src/contacts/helpers",
    "<rootDir>/src/analytic-data-tracker/helpers",
    "<rootDir>/src/__deprecated__/context-menu",
    "<rootDir>/src/files-manager/helpers",
  ],
  testEnvironment: "node",
}
