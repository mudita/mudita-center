/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import Button from "../button.component"
import { DisplayStyle, Size } from "../button.config"

import { fireEvent } from "@testing-library/dom"
import { MemoryRouter } from "react-router-dom"

import testScenarios from "./test-scenarios"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

interface TestCase {
  disabled?: boolean
  displayStyle: DisplayStyle
  href?: string
  size?: Size
}

interface TestScenario {
  name: string
  cases: TestCase[]
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/ban-types
  commonProps?: object
}

describe("Button matches snapshots", () => {
  testScenarios.map((testScenario: TestScenario) => {
    const { name } = testScenario
    testScenario.cases.forEach((testCase: TestCase) => {
      const { disabled, displayStyle, size } = testCase

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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

test("link-button should have active class when clicked", () => {
  const currentPath = "/music"
  const data = {
    displayStyle: DisplayStyle.MenuLink,
    label: "Example",
    to: "/overview",
    Icon: IconType.Upload,
    nav: true,
  }
  const data2 = {
    displayStyle: DisplayStyle.MenuLink,
    label: "Music",
    to: currentPath,
    Icon: IconType.Upload,
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

  expect(firstLink).toHaveClass("active")
})
