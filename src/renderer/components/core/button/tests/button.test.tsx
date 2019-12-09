import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Button, { DisplayStyle, Size } from "../button.component"

import testScenarios from "./test-scenarios"

interface TestCase {
  disabled?: boolean
  displayStyle: DisplayStyle
  href?: string
  size?: Size
}

interface TestScenario {
  name: string
  cases: TestCase[]
  commonProps?: object
}

describe("Button matches snapshots", () => {
  testScenarios.map((testScenario: TestScenario) => {
    const { name } = testScenario
    const label = "Click"
    testScenario.cases.forEach((testCase: TestCase) => {
      const { disabled, displayStyle, size } = testCase
      const { container } = renderWithThemeAndIntl(
        <Button
          {...testCase}
          {...testScenario.commonProps}
          label={label}
          disabled={!!disabled}
        />
      )

      test(`${name} displayStyle: ${displayStyle} size: ${size} disabled: ${!!disabled}`, () => {
        const buttonElement = container.firstChild
        expect(buttonElement).toMatchSnapshot()
      })
    })
  })
})
