/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import Text from "./text.component"
import { mockDefineMessages } from "Core/__deprecated__/renderer/utils/mock-define-messages"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { TextDisplayStyle } from "app-theme/models"

const exampleMessageId = "module.news"
const message = mockDefineMessages()

test("should render default case", () => {
  const defaultTag = "div"
  const { getByText } = renderWithThemeAndIntl(
    <Text displayStyle={TextDisplayStyle.Default} message={message} />
  )
  expect(
    getByText(exampleMessageId, { exact: false }).tagName.toLowerCase()
  ).toBe(defaultTag)
  expect(getByText(exampleMessageId, { exact: false })).toBeTranslationKey()
})

test("should render with children and as prop", () => {
  const headlineLevel = "h3"
  const headlineText = "Example"
  const { getByText } = renderWithThemeAndIntl(
    <Text displayStyle={TextDisplayStyle.Headline1} element={headlineLevel}>
      {headlineText}
    </Text>
  )
  expect(getByText(headlineText).tagName.toLowerCase()).toBe(headlineLevel)
  expect(getByText(headlineText)).toHaveTextContent(headlineText)
})

test("should render with mapped element tagname", () => {
  const expectedHeadline1Tag = "h1"
  const { getByText } = renderWithThemeAndIntl(
    <Text
      displayStyle={TextDisplayStyle.Headline1}
      message={{ id: exampleMessageId }}
    />
  )
  expect(
    getByText(exampleMessageId, { exact: false }).tagName.toLowerCase()
  ).toBe(expectedHeadline1Tag)
})
