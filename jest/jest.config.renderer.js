const jestConfig = require("./jest.config.core")

module.exports = {
  ...jestConfig,
  testMatch: [
    "<rootDir>/libs/core/**/components/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/libs/core/**/actions/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/libs/core/**/hooks/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/libs/core/contact-support/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/libs/core/__deprecated__/context-menu/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/libs/core/__deprecated__/renderer/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/libs/core/contacts/helpers/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/libs/core/analytic-data-tracker/helpers/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/libs/core/files-manager/helpers/**/*(*.)+(spec|test).[tj]s?(x)",
  ],
  testEnvironment: "jsdom",
}
