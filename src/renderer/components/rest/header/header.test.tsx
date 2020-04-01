import "@testing-library/jest-dom"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import Header from "Renderer/components/rest/header/header.component"
import Tabs from "Renderer/components/rest/header/tabs.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { HeaderButton } from "Renderer/wrappers/layout-desktop-wrapper"
import { Type } from "Renderer/components/core/icon/icon.config"
import { intl } from "Renderer/utils/intl"

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
  expect(getByTestId("location")).toHaveTextContent("Overview")
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
            Icon={Type.ExternalLink}
            label={intl.formatMessage({
              id: "view.name.news.moreNewsButtonLabel",
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
