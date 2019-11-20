import "@testing-library/jest-dom/extend-expect"
import { cleanup } from "@testing-library/react"
import React from "react"
import Text, { TextDisplayStyle } from "Renderer/components/text/text.component"
import localeEn from "Renderer/locales/main/en-US.json"
import { renderWithTheme } from "Renderer/utils/renderWithTheme"

afterEach(cleanup)

test("should render default case", () => {
  const textId = "test.string"
  const defaultTag = "div"
  const { getByText } = renderWithTheme(
    <Text displayStyle={TextDisplayStyle.Default} textId={textId} />
  )
  expect(getByText(localeEn[textId]).tagName.toLowerCase()).toBe(defaultTag)
  expect(getByText(localeEn[textId])).toHaveTextContent(localeEn[textId])
})

test("should render with children and as prop", () => {
  const headlineLevel = "h3"
  const headlineText = "Example"
  const { getByText } = renderWithTheme(
    <Text displayStyle={TextDisplayStyle.PrimaryHeading} as={headlineLevel}>
      {headlineText}
    </Text>
  )
  expect(getByText(headlineText).tagName.toLowerCase()).toBe(headlineLevel)
})
