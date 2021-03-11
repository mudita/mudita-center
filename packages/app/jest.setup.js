require("@testing-library/jest-dom/extend-expect")
require("jest-styled-components")
const toBeTranslationKey = require("./src/jestMatchers/to-be-translation-key")
const ReactModal = require("react-modal")
ReactModal.setAppElement(document.createElement("div"))

expect.extend({
  toBeTranslationKey,
})
