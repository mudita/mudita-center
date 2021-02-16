/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { HelpComponentTestIds } from "Renderer/modules/help/help.enum"
import Help from "Renderer/modules/help/help.component"
import { Router } from "react-router"
import history from "Renderer/routes/history"
import { data } from "App/seeds/help"
import { fireEvent } from "@testing-library/dom"

const defaultProps = {
  list: data,
  searchQuestion: jest.fn(),
  setSearchValue: jest.fn(),
}

const renderer = (extraProps?: {}) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(
    <Router history={history}>
      <Help {...props} />
    </Router>
  )
}

test("Help component renders", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(HelpComponentTestIds.Wrapper)).toBeInTheDocument()
})

test("render title correctly", () => {
  const titleText = "view.name.help.title"
  const { getByTestId } = renderer()
  expect(getByTestId(HelpComponentTestIds.Title)).toHaveTextContent(titleText)
})

test("renders correct amount of links", () => {
  const { getAllByRole } = renderer()
  expect(getAllByRole("link")).toHaveLength(defaultProps.list.collection.length)
})

test("search input works", () => {
  const { getByRole } = renderer()
  const searchInput = getByRole("searchbox")
  fireEvent.change(searchInput, {
    target: { value: "adsad" },
  })
  expect(defaultProps.searchQuestion).toBeCalled()
})
