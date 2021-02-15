const jestConfig = require("./jest.config")

module.exports = {
  ...jestConfig,
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
}
