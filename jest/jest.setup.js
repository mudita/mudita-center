require("@testing-library/jest-dom")
require("jest-styled-components")
require("reflect-metadata")
const toBeTranslationKey = require("./testing-support/jestMatchers/to-be-translation-key")

jest.mock("Core/device/strategies/pure.strategy", () => {
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
