import "@testing-library/jest-dom"
import React from "react"
import Tab from "Renderer/components/rest/header/tab.component"
import check from "Renderer/svg/check-icon.svg"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("has correct text content", () => {
  const { container } = renderWithThemeAndIntl(
    <Tab icon={check} tabText={"Phone"} />
  )
  const tabNode = container.firstChild
  expect(tabNode).toHaveTextContent("Phone")
})
