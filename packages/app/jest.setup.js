require("@testing-library/jest-dom/extend-expect")
require("jest-styled-components")
require("reflect-metadata")
const toBeTranslationKey = require("./src/testing-support/jestMatchers/to-be-translation-key")

jest.mock("App/device/strategies/pure.strategy", () => {
  return {
    PureStrategy: class PureStrategy {
      constructor() {}
      connect() {}
      off() {}
      offCommunicationEvent() {}
      on() {}
      onCommunicationEvent() {}
      request() {}
    },
  }
})

expect.extend({
  toBeTranslationKey,
})
