/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import { fireEvent } from "@testing-library/dom"
import store from "Renderer/store"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { HelpComponentTestIds } from "App/help/help.enum"
import Help from "App/help/help.component"
import { Router } from "react-router"
import history from "Renderer/routes/history"
import { data } from "App/seeds/help"

type Props = ComponentProps<typeof Help>

const defaultProps: Props = {
  list: data,
  searchQuestion: jest.fn(),
  openContactSupportFlow: jest.fn(),
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(
    <Provider store={store}>
      <Router history={history}>
        <Help {...props} />
      </Router>
    </Provider>
  )
}

test("Help component renders", () => {
  const { getByTestId } = render()
  expect(getByTestId(HelpComponentTestIds.Wrapper)).toBeInTheDocument()
})

test("render title correctly", () => {
  const titleText = "module.help.title"
  const { getByTestId } = render()
  expect(getByTestId(HelpComponentTestIds.Title)).toHaveTextContent(titleText)
})

test("renders correct amount of links", () => {
  const { getAllByRole } = render()
  expect(getAllByRole("link")).toHaveLength(defaultProps.list.collection.length)
})

test("search input works", () => {
  const { getByRole } = render()
  const searchInput = getByRole("searchbox")
  fireEvent.change(searchInput, {
    target: { value: "adsad" },
  })
  expect(defaultProps.searchQuestion).toBeCalled()
})

test("click `SupportButton` emit `openContactSupportFlow` event", () => {
  const openContactSupportFlow = jest.fn()
  const { getByTestId } = render({ openContactSupportFlow })
  fireEvent.click(getByTestId(HelpComponentTestIds.SupportButton))
  expect(openContactSupportFlow).toHaveBeenCalled()
})
