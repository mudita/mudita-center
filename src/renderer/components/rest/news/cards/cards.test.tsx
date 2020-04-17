import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Cards from "Renderer/components/rest/news/cards/cards.component"
import {
  moreNewsItems,
  newsItems,
} from "Renderer/components/rest/news/cards/cards-mock-data"

test("should render 3 cards", () => {
  const cardsTestId = "news-card"
  const { getAllByTestId } = renderWithThemeAndIntl(
    <Cards newsItems={newsItems} />
  )

  expect(getAllByTestId(cardsTestId)).toHaveLength(3)
})

test("should render 3 cards even when more than 3 elements are passed through props", () => {
  const cardsTestId = "news-card"
  const { getAllByTestId } = renderWithThemeAndIntl(
    <Cards newsItems={moreNewsItems} />
  )

  expect(getAllByTestId(cardsTestId)).toHaveLength(3)
})
