import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import RangeIcon from "Renderer/components/core/icon/range-icon.component"

describe("range icon returns correct component", () => {
  const testScenario = [
    {
      strength: 0,
      dataTestId: "no-range",
    },
    {
      strength: 1,
      dataTestId: "very-low-range",
    },
    {
      strength: 21,
      dataTestId: "low-range",
    },
    {
      strength: 41,
      dataTestId: "medium-range",
    },
    {
      strength: 61,
      dataTestId: "high-range",
    },
    {
      strength: 90,
      dataTestId: "very-high-range",
    },
  ]
  testScenario.forEach(({ strength, dataTestId }) => {
    test(`strength: ${strength}, dataTestId: ${dataTestId}`, () => {
      const { getByTestId } = renderWithThemeAndIntl(
        <RangeIcon strenght={strength} />
      )
      expect(getByTestId(dataTestId)).toBeInTheDocument()
    })
  })
})
