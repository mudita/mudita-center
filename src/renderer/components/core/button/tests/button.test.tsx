import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Button from "../button.component"
import { DisplayStyle, Size } from "../button.config"

import { fireEvent } from "@testing-library/dom"
import { wait } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Upload from "Renderer/svg/upload.svg"
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
    testScenario.cases.forEach((testCase: TestCase) => {
      const { disabled, displayStyle, size } = testCase

      test(`${name} displayStyle: ${displayStyle} size: ${size} disabled: ${!!disabled}`, () => {
        const { container } = renderWithThemeAndIntl(
          <Button {...testCase} {...testScenario.commonProps} />
        )
        const buttonElement = container.firstChild
        expect(buttonElement).toMatchSnapshot()
      })
    })
  })
})

test("link-button should have active class when clicked", async () => {
  const data = {
    displayStyle: DisplayStyle.Link4,
    label: "Example",
    to: "/overview",
    Icon: Upload,
    nav: true,
  }
  const { container, getByText } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={["/overview"]}>
      <Button {...data} />
    </MemoryRouter>
  )

  fireEvent.click(getByText("Example"))

  await wait(() => {
    expect(container).toMatchSnapshot()
    expect(container.querySelector("a")).toHaveClass("active")
  })
})
