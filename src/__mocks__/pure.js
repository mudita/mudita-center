jest.mock('pure', () => ({
  ...jest.requireActual('pure'),
  default: {}
}))

const pure = require("pure")

module.exports = pure
