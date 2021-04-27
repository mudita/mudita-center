/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import LastUpdate from "Renderer/components/rest/news/last-update/last-update.component"
import { intl } from "Renderer/utils/intl"

test("should render offline text by default", () => {
  const { container } = renderWithThemeAndIntl(
    <LastUpdate date="2019-10-18T11:27:15.256Z" />
  )

  expect(container).toHaveTextContent(
    intl.formatMessage({ id: "module.news.offlineText" })
  )
})

test("date is passed correctly and renders with correct format", () => {
  const { container } = renderWithThemeAndIntl(
    <LastUpdate online date="2019-10-19T11:27:15.256Z" />
  )

  expect(container).toHaveTextContent("module.news.lastUpdate")
})

test("when date is not provided, formatted date is not displayed", () => {
  const { container } = renderWithThemeAndIntl(<LastUpdate />)
  expect(container).toHaveTextContent(
    intl.formatMessage({ id: "module.news.offlineText" })
  )
  expect(container).not.toHaveTextContent("module.news.lastUpdate")
})
