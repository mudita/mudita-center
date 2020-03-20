import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ProductCard from "Renderer/components/rest/news/product-card/product-card.component"

test("link receives correct url", () => {
  const linkId = "image-link"
  const url = "https://mudita.com/"
  const { getByTestId } = renderWithThemeAndIntl(<ProductCard url={url} />)
  expect(getByTestId(linkId)).toHaveAttribute("href", url)
})
