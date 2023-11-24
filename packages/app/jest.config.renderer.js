const jestConfig = require("./jest.config.core")

module.exports = {
  ...jestConfig,
  testMatch: [
    "<rootDir>/src/**/components/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/src/**/actions/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/src/**/hooks/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/src/contact-support/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/src/__deprecated__/context-menu/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/src/__deprecated__/renderer/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/src/contacts/helpers/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/src/analytic-data-tracker/helpers/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/src/files-manager/helpers/**/*(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/src/messages/services/**/*(*.)+(spec|test).[tj]s?(x)",
  ],
  testEnvironment: "jsdom",
}
