import "@testing-library/jest-dom"
import React from "react"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { mockDefineMessages } from "Renderer/utils/mock-define-messages"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const exampleMessageId = "view.name.news"
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
    <Text
      displayStyle={TextDisplayStyle.PrimaryHeading}
      element={headlineLevel}
    >
      {headlineText}
    </Text>
  )
  expect(getByText(headlineText).tagName.toLowerCase()).toBe(headlineLevel)
  expect(getByText(headlineText)).toHaveTextContent(headlineText)
})

test("should render with mapped element tagname", () => {
  const expectedPrimaryHeadingTag = "h1"
  const { getByText } = renderWithThemeAndIntl(
    <Text
      displayStyle={TextDisplayStyle.PrimaryHeading}
      message={{ id: exampleMessageId }}
    />
  )
  expect(
    getByText(exampleMessageId, { exact: false }).tagName.toLowerCase()
  ).toBe(expectedPrimaryHeadingTag)
})
