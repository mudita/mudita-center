/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { searchResultFormatter } from "App/messages/components/messages-input-search/messages-input-search.helper"

describe("Provide text longer then default value (36 symbols)", () => {
  describe("when a word presents in a string", () => {
    test("returns string wrapped with `...` and target word wrapped in `strong` tag", () => {
      expect(
        searchResultFormatter(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "sit"
        )
      ).toEqual("...Lorem ipsum dolor <strong>sit</strong> amet, consec...")
    })
  })

  describe("when a word doesn't presents in a string", () => {
    test("returns string with `...` on the end", () => {
      expect(
        searchResultFormatter(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "test"
        )
      ).toEqual("Lorem ipsum dolor sit amet, consecte...")
    })
  })
})

describe("Provide text shorter then default value (36 symbols)", () => {
  describe("when a word presents in a string", () => {
    test("returns string with target word wrapped in `strong` tag", () => {
      expect(
        searchResultFormatter("dolor sit amet, consectetur", "sit")
      ).toEqual("dolor <strong>sit</strong> amet, consec")
    })
  })

  describe("when a word doesn't presents in a string", () => {
    test("returns provided string", () => {
      expect(
        searchResultFormatter("dolor sit amet, consectetur", "test")
      ).toEqual("dolor sit amet, consectetur")
    })
  })
})
