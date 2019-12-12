import "@testing-library/jest-dom/extend-expect"
import { fireEvent } from "@testing-library/react"
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

test("has correct border after click", () => {
  const { queryAllByTestId } = renderWithThemeAndIntl(
    <Tabs>
      <Tab icon={check} tabText={"Phone"} />
      <Tab icon={check} tabText={"Calls"} />
      <Tab icon={check} tabText={"Dial"} />
    </Tabs>
  )
  const tabNode = queryAllByTestId("tab")[0]
  fireEvent.click(tabNode)
  expect(tabNode).toHaveStyle(`border-bottom: 0.02rem solid #191C20;`)
})
