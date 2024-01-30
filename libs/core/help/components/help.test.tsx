/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import { fireEvent } from "@testing-library/dom"
import store from "Core/__deprecated__/renderer/store"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { HelpComponentTestIds } from "Core/help/components/help.enum"
import Help from "Core/help/components/help.component"
import { data } from "Core/__deprecated__/seeds/help"

jest.mock("@electron/remote", () => ({
  dialog: {
    showOpenDialog: jest.fn(),
  },
}))

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
      <Help {...props} />
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
