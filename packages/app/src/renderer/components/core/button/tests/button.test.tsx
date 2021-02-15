/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Button from "../button.component"
import { DisplayStyle, Size } from "../button.config"

import { fireEvent } from "@testing-library/dom"
import { waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Type } from "Renderer/components/core/icon/icon.config"

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
  const currentPath = "/music"
  const data = {
    displayStyle: DisplayStyle.Link4,
    label: "Example",
    to: "/overview",
    Icon: Type.Upload,
    nav: true,
  }
  const data2 = {
    displayStyle: DisplayStyle.Link4,
    label: "Music",
    to: currentPath,
    Icon: Type.Upload,
    nav: true,
  }
  const { container, getByText } = renderWithThemeAndIntl(
    <MemoryRouter initialEntries={[currentPath]}>
      <Button {...data} />
      <Button {...data2} />
    </MemoryRouter>
  )
  const firstButton = getByText("Example")
  const firstLink = container.querySelector("a")

  expect(firstLink).not.toHaveClass("active")

  fireEvent.click(firstButton)

  await waitFor(() => {
    expect(firstLink).toHaveClass("active")
  })
})
