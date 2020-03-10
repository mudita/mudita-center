import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Battery from "Renderer/components/core/icon/battery.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("battery return correct amount of bars based on battery level", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <Battery batteryLevel={0.5} />
  )
  const barsTestId = "bar"
  expect(getAllByTestId(barsTestId)).toHaveLength(3)
})
