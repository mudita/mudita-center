import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { defineMessages } from "react-intl"
import { MemoryRouter } from "react-router-dom"
import Header from "Renderer/components/rest/header/header.component"
import Tab from "Renderer/components/rest/header/tab.component"
import Tabs from "Renderer/components/rest/header/tabs.component"
import check from "Renderer/svg/check-icon.svg"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const exampleMessageId = "view.name.news"
const messages = defineMessages({
  exampleMessage: { id: exampleMessageId },
})

test("matches snapshot", () => {
  const message = messages.exampleMessage
  const { container } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={["/overview"]}>
      <Header
        middleComponent={
          <Tabs>
            <Tab icon={check} tabText={message} />
            <Tab icon={check} tabText={message} />
            <Tab icon={check} tabText={message} />
          </Tabs>
        }
      />
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
