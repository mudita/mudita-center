import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import Tabs from "Renderer/components/rest/header/tabs.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("has correct amount of children", () => {
  const currentLocation = "/messages"
  const { container } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={[currentLocation]}>
      <Tabs currentLocation={currentLocation} />
    </MemoryRouter>
  )

  const tabLinks = container.querySelectorAll("a")
  expect(tabLinks).toHaveLength(2)
})
