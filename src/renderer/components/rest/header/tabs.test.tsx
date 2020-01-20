import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { defineMessages } from "react-intl"
import Tab from "Renderer/components/rest/header/tab.component"
import Tabs from "Renderer/components/rest/header/tabs.component"
import check from "Renderer/svg/check-icon.svg"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const exampleMessageId = "view.name.news"
const messages = defineMessages({
  exampleMessage: { id: exampleMessageId },
})

test("has correct amount of children", () => {
  const message = messages.exampleMessage

  const { getAllByTestId } = renderWithThemeAndIntl(
    <Tabs>
      <Tab icon={check} tabText={message} />
      <Tab icon={check} tabText={message} />
      <Tab icon={check} tabText={message} />
    </Tabs>
  )
  const tabNodes = getAllByTestId("tab")
  expect(tabNodes).toHaveLength(3)
})
