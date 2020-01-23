import "@testing-library/jest-dom"
import React from "react"
import Tab from "Renderer/components/rest/header/tab.component"
import Tabs from "Renderer/components/rest/header/tabs.component"
import check from "Renderer/svg/check-icon.svg"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("has correct amount of children", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <Tabs>
      <Tab icon={check} tabText={"Phone"} />
      <Tab icon={check} tabText={"Calls"} />
      <Tab icon={check} tabText={"Dial"} />
    </Tabs>
  )
  const tabNodes = getAllByTestId("tab")
  expect(tabNodes).toHaveLength(3)
})
