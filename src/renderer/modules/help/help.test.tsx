import React from "react"
import { fireEvent } from "@testing-library/dom"

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

import { HelpComponentTestIds } from "Renderer/modules/help/help.interface"
import { DevModeTestIds } from "Renderer/modules/help/devmode/devmode.interface"
import Help from "Renderer/modules/help/help.component"

const defaultProps = {
  disable: jest.fn(),
  enable: jest.fn(),
  isDevModeEnabled: false,
}

test("Help component renders", () => {
  const { getByTestId } = renderWithThemeAndIntl(<Help {...defaultProps} />)
  expect(getByTestId(HelpComponentTestIds.Wrapper)).toBeInTheDocument()
})

test("Help components displays Dev Mode", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <Help {...defaultProps} devModeEnabled />
  )

  expect(getByTestId(DevModeTestIds.Wrapper)).toBeInTheDocument()
})

test("Help component should enable Dev Mode when conditions are met", () => {
  const enable = () => console.log("hello there")
  const { getByTestId } = renderWithThemeAndIntl(
    <Help {...defaultProps} enable={enable} />
  )

  for (let i = 0; i < 10; i++) {
    fireEvent.click(getByTestId(HelpComponentTestIds.Wrapper))
  }
})
