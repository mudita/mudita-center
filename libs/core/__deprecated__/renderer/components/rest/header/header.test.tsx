/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { MemoryRouter } from "react-router-dom"
import Header from "Core/__deprecated__/renderer/components/rest/header/header.component"
import Tabs from "Core/__deprecated__/renderer/components/rest/header/tabs.component"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { HeaderButton } from "Core/__deprecated__/renderer/wrappers/layout-desktop-wrapper"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { flags } from "Core/feature-flags"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { Provider } from "react-redux"
import store from "Core/__deprecated__/renderer/store"

jest.mock("Core/feature-flags")

test("matches snapshot without tabs", () => {
  const currentLocation = "/overview"
  const { container } = renderWithThemeAndIntl(
    <Provider store={store}>
      <MemoryRouter initialEntries={[currentLocation]}>
        <Header middleComponent={<Tabs currentLocation={currentLocation} />} />
      </MemoryRouter>
    </Provider>
  )
  const header = container.firstChild
  expect(header).toMatchSnapshot()
})

test("matches snapshot with tabs", () => {
  jest.spyOn(flags, "get").mockReturnValueOnce(true)
  const currentLocation = "/phone"
  const { container } = renderWithThemeAndIntl(
    <Provider store={store}>
      <MemoryRouter initialEntries={[currentLocation]}>
        <Header middleComponent={<Tabs currentLocation={currentLocation} />} />
      </MemoryRouter>
    </Provider>
  )
  const header = container.firstChild
  expect(header).toMatchSnapshot()
})

test("header should render correct pathname", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/overview"]}>
        <Header />
      </MemoryRouter>
    </Provider>
  )
  expect(getByTestId("location")).toHaveTextContent("module.overview")
})

test("button renders on news page", () => {
  const currentLocation = "/news"
  const buttonsIconId = "icon-ExternalLink"
  const { getByTestId } = renderWithThemeAndIntl(
    <Provider store={store}>
      <MemoryRouter initialEntries={[currentLocation]}>
        <Header
          middleComponent={<Tabs currentLocation={currentLocation} />}
          button={
            <HeaderButton
              Icon={IconType.ExternalLink}
              label={intl.formatMessage({
                id: "module.news.moreNewsButtonLabel",
              })}
              href={"https://www.mudita.com/"}
              target="_blank"
            />
          }
        />
      </MemoryRouter>
    </Provider>
  )
  expect(getByTestId(buttonsIconId)).toBeInTheDocument()
})

test("button doesnt render on other pages than news", () => {
  const currentLocation = "/phone"
  const buttonsIconId = "icon-More"
  const { queryByTestId } = renderWithThemeAndIntl(
    <Provider store={store}>
      <MemoryRouter initialEntries={[currentLocation]}>
        <Header middleComponent={<Tabs currentLocation={currentLocation} />} />
      </MemoryRouter>
    </Provider>
  )
  expect(queryByTestId(buttonsIconId)).not.toBeInTheDocument()
})
