const jestConfig = require("./jest.config.core")

module.exports = {
  ...jestConfig,
  testMatch: [
    "**/?(*.)+(test|spec).[jt]s?(x)",
  ],
}
