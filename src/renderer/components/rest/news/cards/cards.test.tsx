import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Cards from "Renderer/components/rest/news/cards/cards.component"
import { newsItems } from "Renderer/components/rest/news/cards/cards-mock-data"

test("should render 3 cards", () => {
  const cardsTestId = "news-card"
  const { getAllByTestId } = renderWithThemeAndIntl(
    <Cards newsItems={newsItems} />
  )

  expect(getAllByTestId(cardsTestId)).toHaveLength(3)
})
