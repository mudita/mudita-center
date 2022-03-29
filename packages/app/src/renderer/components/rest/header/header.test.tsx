/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import Header from "Renderer/components/rest/header/header.component"
import Tabs from "Renderer/components/rest/header/tabs.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { HeaderButton } from "Renderer/wrappers/layout-desktop-wrapper"
import { intl } from "Renderer/utils/intl"
import { flags } from "App/feature-flags"
import { IconType } from "Renderer/components/core/icon/icon-type"

jest.mock("App/feature-flags")

test("matches snapshot without tabs", () => {
  const currentLocation = "/overview"
  const { container } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={[currentLocation]}>
      <Header middleComponent={<Tabs currentLocation={currentLocation} />} />
    </MemoryRouter>
  )
  const header = container.firstChild
  expect(header).toMatchSnapshot()
})

test("matches snapshot with tabs", () => {
  jest.spyOn(flags, "get").mockReturnValueOnce(true)
  const currentLocation = "/phone"
  const { container } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={[currentLocation]}>
      <Header middleComponent={<Tabs currentLocation={currentLocation} />} />
    </MemoryRouter>
  )
  const header = container.firstChild
  expect(header).toMatchSnapshot()
})

test("header should render correct pathname", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={["/overview"]}>
      <Header />
    </MemoryRouter>
  )
  expect(getByTestId("location")).toHaveTextContent("module.overview")
})

test("button renders on news page", () => {
  const currentLocation = "/news"
  const buttonsIconId = "icon-ExternalLink"
  const { getByTestId } = renderWithThemeAndIntl(
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
  )
  expect(getByTestId(buttonsIconId)).toBeInTheDocument()
})

test("button doesnt render on other pages than news", () => {
  const currentLocation = "/phone"
  const buttonsIconId = "icon-More"
  const { queryByTestId } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={[currentLocation]}>
      <Header middleComponent={<Tabs currentLocation={currentLocation} />} />
    </MemoryRouter>
  )
  expect(queryByTestId(buttonsIconId)).not.toBeInTheDocument()
})
