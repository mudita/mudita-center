/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { SearchResultAccent } from "App/search/components/search-result-accent/search-result-accent.component"
import { SearchResultAccentProps } from "App/search/components/search-result-accent/search-result-accent.interface"

const defaultProps: SearchResultAccentProps = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  query: "sit",
  maxSymbols: 36,
}

const render = (extraProps?: Partial<SearchResultAccentProps>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<SearchResultAccent {...props} />)
}

describe("Provide text longer then default value (36 symbols)", () => {
  describe("when a word presents in a string", () => {
    test("returns string wrapped with `...` and target word wrapped in `strong` tag", () => {
      const { container } = render()

      expect(container).toHaveTextContent(
        "...Lorem ipsum dolor sit amet, consec..."
      )
      expect(container.querySelector("strong")).toHaveTextContent("sit")
    })
  })

  describe("when a word doesn't presents in a string", () => {
    test("returns string with `...` on the end", () => {
      const { container } = render({
        query: "test",
      })

      expect(container).toHaveTextContent(
        "Lorem ipsum dolor sit amet, consecte..."
      )
      expect(container.querySelector("strong")).not.toBeInTheDocument()
    })
  })
})

describe("Provide text shorter then default value (36 symbols)", () => {
  describe("when a word presents in a string", () => {
    test("returns string with target word wrapped in `strong` tag", () => {
      const { container } = render({
        text: "dolor sit amet, consectetur",
        query: "sit",
      })

      expect(container).toHaveTextContent("dolor sit amet, consec")
      expect(container.querySelector("strong")).toHaveTextContent("sit")
    })
  })

  describe("when a word doesn't presents in a string", () => {
    test("returns provided string", () => {
      const { container } = render({
        text: "dolor sit amet, consectetur",
        query: "test",
      })

      expect(container).toHaveTextContent("dolor sit amet, consec")
      expect(container.querySelector("strong")).not.toBeInTheDocument()
    })
  })
})
