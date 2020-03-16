import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Card from "Renderer/components/rest/news/card/card.component"

test("should render header", () => {
  const headerText = "Example test"
  const { container } = renderWithThemeAndIntl(<Card />)
  const header = container.querySelector("h2")
  expect(header).toBeInTheDocument()
  expect(header).toHaveTextContent(headerText)
})

test("should render header", () => {
  const headerText = "Example test"
  const { container } = renderWithThemeAndIntl(<Card />)
  const header = container.querySelector("h2")
  expect(header).toBeInTheDocument()
  expect(header).toHaveTextContent(headerText)
})
