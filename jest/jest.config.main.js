const jestConfig = require("./jest.config.core")

module.exports = {
  ...jestConfig,
  testMatch: ["<rootDir>/**/*(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: [
    ...jestConfig.testPathIgnorePatterns,
    "components",
    "actions",
    "hooks",
    "<rootDir>/libs/core/contact-support",
    "<rootDir>/libs/core/__deprecated__/renderer",
    "<rootDir>/libs/core/contacts/helpers",
    "<rootDir>/libs/core/analytic-data-tracker/helpers",
    "<rootDir>/libs/core/__deprecated__/context-menu",
    "<rootDir>/libs/core/files-manager/helpers",
  ],
  testEnvironment: "node",
}
