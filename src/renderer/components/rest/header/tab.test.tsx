import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { defineMessages } from "react-intl"
import Tab from "Renderer/components/rest/header/tab.component"
import check from "Renderer/svg/check-icon.svg"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const exampleMessageId = "view.name.news"
const messages = defineMessages({
  exampleMessage: { id: exampleMessageId },
})

test("has correct text content", () => {
  const message = messages.exampleMessage
  const { container } = renderWithThemeAndIntl(
    <Tab icon={check} tabText={message} />
  )
  const tabNode = container.firstChild
  expect(tabNode).toHaveTextContent("Phone")
})
