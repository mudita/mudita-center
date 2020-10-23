const jestConfig = require("./jest.config")

module.exports = {
  ...jestConfig,
  testRegex: "(/__tests__/.*|(\\.|/)(e2e))\\.([tj]sx?)$",
}
