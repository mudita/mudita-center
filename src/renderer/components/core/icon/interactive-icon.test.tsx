import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import InteractiveIcon from "Renderer/components/core/icon/interactive-icon.component"
import { InteractiveIconType } from "Renderer/components/core/icon/interactive-icon.config"

describe("interactive icon returns correct component", () => {
  const testScenario = [
    {
      interactiveIconType: InteractiveIconType.Range,
      iconState: 1,
      dataTestId: "very-low-range",
    },
    {
      interactiveIconType: InteractiveIconType.Range,
      iconState: 10,
      dataTestId: "low-range",
    },
    {
      interactiveIconType: InteractiveIconType.Range,
      iconState: 40,
      dataTestId: "medium-range",
    },
    {
      interactiveIconType: InteractiveIconType.Range,
      iconState: 60,
      dataTestId: "high-range",
    },
    {
      interactiveIconType: InteractiveIconType.Range,
      iconState: 90,
      dataTestId: "very-high-range",
    },
  ]
  testScenario.forEach(({ interactiveIconType, iconState, dataTestId }) => {
    test(`interactiveIconType: ${interactiveIconType}, iconState: ${iconState}, dataTestId: ${dataTestId}`, () => {
      const { getByTestId } = renderWithThemeAndIntl(
        <InteractiveIcon
          iconState={iconState}
          interactiveIconType={InteractiveIconType.Range}
        />
      )
      expect(getByTestId(dataTestId)).toBeInTheDocument()
    })
  })
})
