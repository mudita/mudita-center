/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Cards from "App/news/components/cards/cards.component"
import { newsItems } from "App/news/components/cards/cards-mock-data"

test("should render 3 cards", () => {
  const cardsTestId = "news-card"
  const { getAllByTestId } = renderWithThemeAndIntl(
    <Cards newsItems={newsItems} />
  )

  expect(getAllByTestId(cardsTestId)).toHaveLength(3)
})
