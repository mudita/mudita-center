import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ProductCards from "Renderer/components/rest/news/product-cards/product-cards.component"
import { mockedCards } from "Renderer/components/rest/news/product-cards/product-cards.stories"
import NickLewis from "Renderer/images/nick-lewis@2x.png"

test("renders 3 product cards", () => {
  const producdCardId = "product-card"
  const { getAllByTestId } = renderWithThemeAndIntl(
    <ProductCards productCards={mockedCards} />
  )

  expect(getAllByTestId(producdCardId)).toHaveLength(3)
})

test("should render 3 product cards even when more than 3 elements are passed through props ", () => {
  const producdCardId = "product-card"
  const extendedCards = [
    ...mockedCards,
    {
      url: "https://www.mudita.com/",
      imageSource: NickLewis,
      editTitle: "Nick Lewis Album",
      subtitle: "Halfway to the begin",
      label: "In development",
      featuresElements: [],
      buttonLabel: "Learn more",
      connected: true,
    },
  ]
  const { getAllByTestId } = renderWithThemeAndIntl(
    <ProductCards productCards={extendedCards} />
  )

  expect(getAllByTestId(producdCardId)).toHaveLength(3)
})
