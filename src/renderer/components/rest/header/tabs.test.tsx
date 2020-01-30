import "@testing-library/jest-dom"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import Tabs from "Renderer/components/rest/header/tabs.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("on current location tabs should not be rendered ", () => {
  const currentLocation = "/overview"
  const { container } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={[currentLocation]}>
      <Tabs currentLocation={currentLocation} />
    </MemoryRouter>
  )

  const tabLinks = container.querySelectorAll("a")
  expect(tabLinks).toHaveLength(0)
})

test("on current location tabs should be rendered", () => {
  const currentLocation = "/messages"
  const { container } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={[currentLocation]}>
      <Tabs currentLocation={currentLocation} />
    </MemoryRouter>
  )

  const tabLinks = container.querySelectorAll("a")
  expect(tabLinks).toHaveLength(2)
})
