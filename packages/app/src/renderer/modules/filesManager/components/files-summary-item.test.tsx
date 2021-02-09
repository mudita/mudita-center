/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import "@testing-library/jest-dom"
import React from "react"
import { Router } from "react-router"
import {
  fakeDataWithoutUrl,
  fakeDataWithUrl,
} from "Renderer/modules/filesManager/components/fake-data"
import FilesSummaryItem from "Renderer/modules/filesManager/components/files-summary-item.component"
import history from "Renderer/routes/history"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("should match snapshot with link", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummaryItem {...fakeDataWithUrl} />
    </Router>
  )
  expect(container.firstChild).toMatchSnapshot()
})

test("should match snapshot without link", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummaryItem {...fakeDataWithoutUrl} />
    </Router>
  )
  expect(container.firstChild).toMatchSnapshot()
})

test("should render", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummaryItem {...fakeDataWithUrl} />
    </Router>
  )
  expect(container.firstChild).toBeInTheDocument()
})

test("should render", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummaryItem {...fakeDataWithoutUrl} />
    </Router>
  )
  expect(container.firstChild).toBeInTheDocument()
})

test("should render link", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummaryItem {...fakeDataWithUrl} />
    </Router>
  )
  const link = container.querySelector("a")
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute("href", "#/tools/voice-recorder")
})

test("should render without link", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummaryItem {...fakeDataWithoutUrl} />
    </Router>
  )
  const link = container.querySelector("a")
  expect(link).not.toBeInTheDocument()
})
