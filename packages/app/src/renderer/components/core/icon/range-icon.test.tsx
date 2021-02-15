import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import RangeIcon from "Renderer/components/core/icon/range-icon.component"

describe("range icon returns correct component", () => {
  const testScenario = [
    {
      strength: 0,
      dataTestId: "icon-NoRange",
    },
    {
      strength: 21,
      dataTestId: "icon-LowRange",
    },
    {
      strength: 41,
      dataTestId: "icon-MediumRange",
    },
    {
      strength: 61,
      dataTestId: "icon-HighRange",
    },
    {
      strength: 90,
      dataTestId: "icon-VeryHighRange",
    },
  ]
  testScenario.forEach(({ strength, dataTestId }) => {
    test(`strength: ${strength}, dataTestId: ${dataTestId}`, () => {
      const { getByTestId } = renderWithThemeAndIntl(
        <RangeIcon strength={strength} />
      )
      expect(getByTestId(dataTestId)).toBeInTheDocument()
    })
  })
})
