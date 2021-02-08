/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import SourceCode, {
  SourceCodeProps,
} from "Renderer/components/storybook/source-code.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const renderSourceCode = (
  { ...props }: SourceCodeProps = { currentLine: 0, code: "" }
) => {
  const outcome = renderWithThemeAndIntl(<SourceCode {...props} />)
  return {
    ...outcome,
    getLines: () => outcome.container.querySelectorAll("code > span"),
  }
}

const code = `<div>\n  <p>test</p>\n</div>`
const highlightStyle = `background-color: #e6ffed;`

test("renders code properly", () => {
  const { getLines } = renderSourceCode({
    code,
  })
  expect(getLines()).toHaveLength(3)
  expect(getLines()[0]).toHaveTextContent("<div>")
  expect(getLines()[1]).toHaveTextContent("<p>test</p>")
  expect(getLines()[2]).toHaveTextContent("</div>")
})

test("doesn't highlight lines by default", () => {
  const { getLines } = renderSourceCode({
    currentLine: 0,
    code,
  })
  expect(getLines()[0]).not.toHaveStyle(highlightStyle)
  expect(getLines()[1]).not.toHaveStyle(highlightStyle)
  expect(getLines()[2]).not.toHaveStyle(highlightStyle)
})

test("highlight single line properly", () => {
  const { getLines } = renderSourceCode({
    currentLine: 2,
    code,
  })
  expect(getLines()[1]).toHaveStyle(highlightStyle)
})

test("highlight multiple lines properly", () => {
  const { getLines } = renderSourceCode({
    currentLine: 1,
    code,
  })
  expect(getLines()[0]).toHaveStyle(highlightStyle)
  expect(getLines()[1]).toHaveStyle(highlightStyle)
  expect(getLines()[2]).toHaveStyle(highlightStyle)
})
