import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Tab from "Renderer/components/rest/header/tab.component"
import check from "Renderer/svg/check-icon.svg"
import { mockDefineMessages } from "Renderer/utils/mock-define-messages"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("has correct text content", () => {
  const message = mockDefineMessages("view.name.phone")
  const { container } = renderWithThemeAndIntl(
    <Tab icon={check} tabText={message} />
  )
  const tabNode = container.firstChild
  expect(tabNode).toHaveTextContent("Phone")
})
