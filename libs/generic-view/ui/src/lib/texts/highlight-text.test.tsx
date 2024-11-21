/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { render } from "@testing-library/react"
import { HighlightText } from "./highlight-text"

describe("HighlightText", () => {
  it("renders text without highlighting when phrase is empty", () => {
    const { container } = render(
      <HighlightText data={{ text: "Hello World", phrase: "" }} />
    )
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Hello World</span>"`
    )
  })

  it("highlights the phrase case-insensitively", () => {
    const { container } = render(
      <HighlightText data={{ text: "Hello World", phrase: "world" }} />
    )
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Hello <strong>World</strong></span>"`
    )
  })

  it("highlights the phrase case-sensitively", () => {
    const { container } = render(
      <HighlightText
        data={{ text: "Hello World, world", phrase: "world" }}
        config={{ caseSensitive: true }}
      />
    )
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Hello World, <strong>world</strong></span>"`
    )
  })

  it("highlights the first occurrence of the phrase", () => {
    const { container } = render(
      <HighlightText data={{ text: "Hello World, World", phrase: "world" }} />
    )
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Hello <strong>World</strong>, World</span>"`
    )
  })

  it("highlights all occurrences of the phrase when scope is 'all'", () => {
    const { container } = render(
      <HighlightText
        data={{ text: "Hello World, World", phrase: "World" }}
        config={{ scope: "all" }}
      />
    )
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Hello <strong>World</strong>, <strong>World</strong></span>"`
    )
  })
})
