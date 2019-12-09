import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Button, { DisplayStyle, Size } from "../button.component"

import testScenarios from "./test-scenarios"

interface TestCase {
  displayStyle: DisplayStyle
  size?: Size
  disabled?: boolean
}

interface TestScenario {
  name: string
  cases: TestCase[]
  commonProps?: object
}

describe("Button matches snapshots", () => {
  testScenarios.map((testScenario: TestScenario) => {
    const { name } = testScenario
    testScenario.cases.forEach((testCase: TestCase) => {
      const { displayStyle, size, disabled } = testCase
      test(`${name} displayStyle: ${displayStyle} size: ${size} disabled: ${!!disabled}`, () => {
        const { container } = renderWithThemeAndIntl(
          <Button
            {...testCase}
            {...testScenario.commonProps}
            label="Click"
            disabled
          />
        )
        const buttonElement = container.firstChild
        expect(buttonElement).toMatchSnapshot()
      })
    })
  })
})
