import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Battery from "Renderer/components/core/icon/battery.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const barsTestId = "bar"
const textTestId = "charging-text"
const noBatteryTestId = "no-battery"

describe("renders correct amount of bars", () => {
  const testScenario = [
    { batteryLevel: 0, numberOfBars: 0 },
    {
      batteryLevel: 0.1,
      numberOfBars: 1,
    },
    {
      batteryLevel: 0.3,
      numberOfBars: 2,
    },
    {
      batteryLevel: 0.5,
      numberOfBars: 3,
    },
    {
      batteryLevel: 0.7,
      numberOfBars: 4,
    },
    {
      batteryLevel: 0.9,
      numberOfBars: 5,
    },
  ]
  testScenario.forEach(({ batteryLevel, numberOfBars }) => {
    test(`batteryLevel: ${batteryLevel}, numberOfBars: ${numberOfBars}`, () => {
      const { queryAllByTestId } = renderWithThemeAndIntl(
        <Battery batteryLevel={batteryLevel} />
      )
      expect(queryAllByTestId(barsTestId)).toHaveLength(numberOfBars)
    })
  })
})

test("charging text renders with no bars and no-battery path", () => {
  const { queryByTestId } = renderWithThemeAndIntl(
    <Battery charging batteryLevel={0.5} />
  )
  expect(queryByTestId(textTestId)).toBeInTheDocument()
  expect(queryByTestId(barsTestId)).not.toBeInTheDocument()
  expect(queryByTestId(noBatteryTestId)).not.toBeInTheDocument()
})

test("renders no-battery with no bars and charging text", () => {
  const { queryByTestId } = renderWithThemeAndIntl(<Battery batteryLevel={0} />)
  expect(queryByTestId(noBatteryTestId)).toBeInTheDocument()
  expect(queryByTestId(barsTestId)).not.toBeInTheDocument()
  expect(queryByTestId(textTestId)).not.toBeInTheDocument()
})
