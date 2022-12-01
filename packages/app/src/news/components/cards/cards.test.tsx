/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import Cards from "App/news/components/cards/cards.component"
import { mockedNewsItems } from "App/news/__mocks__/mocked-news-items"

test("should render 3 cards", () => {
  const cardsTestId = "news-card"
  const { getAllByTestId } = renderWithThemeAndIntl(
    <Cards newsItems={mockedNewsItems} />
  )

  expect(getAllByTestId(cardsTestId)).toHaveLength(3)
})
