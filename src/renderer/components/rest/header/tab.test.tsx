import "@testing-library/jest-dom"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import Tab from "Renderer/components/rest/header/tab.component"
import check from "Renderer/svg/check-icon.svg"
import { mockDefineMessages } from "Renderer/utils/mock-define-messages"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const message = mockDefineMessages("view.name.phone")
const currentLocation = "/phone"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={[currentLocation]}>
      <Tab icon={check} label={message} url={currentLocation} />
    </MemoryRouter>
  )
  expect(container.firstChild).toMatchSnapshot()
})

test("has correct text content", () => {
  const { container } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={[currentLocation]}>
      <Tab icon={check} label={message} />
    </MemoryRouter>
  )
  const tabNode = container.firstChild
  expect(tabNode).toHaveTextContent("Phone")
})
