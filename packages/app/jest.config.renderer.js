const jestConfig = require("./jest.config.core")

module.exports = {
  ...jestConfig,
  testMatch: [
    "**/components/**/?(*.)+(test|spec).[jt]s?(x)",
  ],
  testEnvironment: "jsdom"
}
