import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Text, { TextDisplayStyle } from "Renderer/components/text/text.component"
import localeEn from "Renderer/locales/main/en-US.json"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("should render default case", () => {
  const textId = "test.string"
  const defaultTag = "div"
  const { getByText } = renderWithThemeAndIntl(
    <Text displayStyle={TextDisplayStyle.Default} textId={textId} />
  )
  expect(getByText(localeEn[textId]).tagName.toLowerCase()).toBe(defaultTag)
  expect(getByText(localeEn[textId])).toHaveTextContent(localeEn[textId])
})

test("should render with children and as prop", () => {
  const headlineLevel = "h3"
  const headlineText = "Example"
  const { getByText } = renderWithThemeAndIntl(
    <Text displayStyle={TextDisplayStyle.PrimaryHeading} as={headlineLevel}>
      {headlineText}
    </Text>
  )
  expect(getByText(headlineText).tagName.toLowerCase()).toBe(headlineLevel)
  expect(getByText(headlineText)).toHaveTextContent(headlineText)
})

test("should render with mapped element tagname", () => {
  const textId = "test.string"
  const expectedPrimaryHeadingTag = "h1"
  const { getByText } = renderWithThemeAndIntl(
    <Text displayStyle={TextDisplayStyle.PrimaryHeading} textId={textId} />
  )
  expect(getByText(localeEn[textId]).tagName.toLowerCase()).toBe(
    expectedPrimaryHeadingTag
  )
})
