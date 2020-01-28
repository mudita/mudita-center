import "@testing-library/jest-dom"
import React from "react"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import localeEn from "Renderer/locales/main/en-US.json"
import { mockDefineMessages } from "Renderer/utils/mock-define-messages"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const exampleMessageId = "view.name.news"
const message = mockDefineMessages()

test("should render default case", () => {
  const defaultTag = "div"
  const { getByText } = renderWithThemeAndIntl(
    <Text displayStyle={TextDisplayStyle.Default} message={message} />
  )
  expect(getByText(localeEn[exampleMessageId]).tagName.toLowerCase()).toBe(
    defaultTag
  )
  expect(getByText(localeEn[exampleMessageId])).toHaveTextContent(
    localeEn[exampleMessageId]
  )
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
    <Text displayStyle={TextDisplayStyle.PrimaryHeading} message={message} />
  )
  expect(getByText(localeEn[exampleMessageId]).tagName.toLowerCase()).toBe(
    expectedPrimaryHeadingTag
  )
})
