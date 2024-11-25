/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { render } from "@testing-library/react"
import { HighlightText } from "./highlight-text"

describe("HighlightText", () => {
  it("returns text without highlighting when phrase is empty", () => {
    const { container } = render(
      <HighlightText data={{ text: "Marek Marmarecki", phrase: "" }} />
    )
    expect(container.innerHTML).toMatchInlineSnapshot(`"Marek Marmarecki"`)
  })

  it("returns text without highlighting when phrase is not found", () => {
    const { container } = render(
      <HighlightText data={{ text: "Marek Marmarecki", phrase: "xyz" }} />
    )
    expect(container.innerHTML).toMatchInlineSnapshot(`"Marek Marmarecki"`)
  })

  it("returns null when data is undefined", () => {
    const { container } = render(<HighlightText data={undefined} />)
    expect(container?.innerHTML).toBe("")
  })

  describe("accepts the 'caseSensitive' option", () => {
    it("so it highlights the phrase case-insensitively by default", () => {
      const { container } = render(
        <HighlightText data={{ text: "Marek Marmarecki", phrase: "mar" }} />
      )
      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<strong>Mar</strong>ek <strong>Marmar</strong>ecki"`
      )
    })

    it("so it highlights the phrase case-sensitively if caseSensitive option is true", () => {
      const { container } = render(
        <HighlightText
          data={{ text: "Marek Marmarecki", phrase: "mar" }}
          config={{ caseSensitive: true }}
        />
      )
      expect(container.innerHTML).toMatchInlineSnapshot(
        `"Marek Mar<strong>mar</strong>ecki"`
      )
    })
  })

  describe("accepts the scope option", () => {
    it("so it highlights the all occurrences of the phrase by default", () => {
      const { container } = render(
        <HighlightText
          data={{ text: "Marek Marmarecki Marekowski", phrase: "mar" }}
        />
      )
      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<strong>Mar</strong>ek <strong>Marmar</strong>ecki <strong>Mar</strong>ekowski"`
      )
    })

    it("so it highlights the first occurrence of the phrase when scope is 'first'", () => {
      const { container } = render(
        <HighlightText
          data={{ text: "Marek Marmarecki Marekowski", phrase: "mar" }}
          config={{ scope: "first" }}
        />
      )
      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<strong>Mar</strong>ek Marmarecki Marekowski"`
      )
    })

    it("so it highlights the last occurrence of the phrase when scope is 'last'", () => {
      const { container } = render(
        <HighlightText
          data={{ text: "Marek Marmarecki Marekowski", phrase: "mar" }}
          config={{ scope: "last" }}
        />
      )
      expect(container.innerHTML).toMatchInlineSnapshot(
        `"Marek Marmarecki <strong>Mar</strong>ekowski"`
      )
    })
  })

  describe("accepts the mode option", () => {
    it("so it highlights the phrase anywhere by default", () => {
      const { container } = render(
        <HighlightText
          data={{ text: "Marek Marmarecki Marekowski", phrase: "mar" }}
        />
      )
      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<strong>Mar</strong>ek <strong>Marmar</strong>ecki <strong>Mar</strong>ekowski"`
      )
    })

    it("so it highlights the phrase at the beginning of each matching word when mode is 'word-start'", () => {
      const { container } = render(
        <HighlightText
          data={{ text: "Marek Marmarecki Marekowski", phrase: "mar" }}
          config={{ mode: "word-start" }}
        />
      )
      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<strong>Mar</strong>ek <strong>Mar</strong>marecki <strong>Mar</strong>ekowski"`
      )
    })

    it("so it highlights the phrase at the end of each matching word when mode is 'word-end'", () => {
      const { container } = render(
        <HighlightText
          data={{ text: "Marek Marmarecki Marekowski", phrase: "ki" }}
          config={{ mode: "word-end" }}
        />
      )
      expect(container.innerHTML).toMatchInlineSnapshot(
        `"Marek Marmarec<strong>ki</strong> Marekows<strong>ki</strong>"`
      )
    })

    it("so it highlights only whole matching words when mode is 'word'", () => {
      const { container } = render(
        <HighlightText
          data={{ text: "Marek Marmarecki Marekowski", phrase: "marek" }}
          config={{ mode: "word" }}
        />
      )
      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<strong>Marek</strong> Marmarecki Marekowski"`
      )
    })
  })

  describe("accepts the phraseWordsSeparated option", () => {
    it("so it highlights the phrase as a whole by default", () => {
      const { container } = render(
        <HighlightText
          data={{ text: "Marek Marmarecki Marekowski", phrase: "marek mar" }}
        />
      )
      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<strong>Marek Mar</strong>marecki Marekowski"`
      )
    })

    it("so it highlights the phrase as separate words when phraseWordsSeparated is true", () => {
      const { container } = render(
        <HighlightText
          data={{ text: "Marek Marmarecki Marekowski", phrase: "marek mar" }}
          config={{ phraseWordsSeparated: true }}
        />
      )
      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<strong>Marek Marmar</strong>ecki <strong>Marek</strong>owski"`
      )
    })
  })
})
