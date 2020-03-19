import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ProductCard from "Renderer/components/rest/news/product-card/product-card.component"

test("should ", () => {
  const { getByTestId } = renderWithThemeAndIntl(<ProductCard />)
})
