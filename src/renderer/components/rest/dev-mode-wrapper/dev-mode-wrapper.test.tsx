import React from "react"

import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.component"

import { DevModeWrapperTestIds } from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.interface"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const TEST_STRING = "Hello there"

test("renders nothing when is disabled", () => {
  const { queryByTestId } = renderWithThemeAndIntl(
    <DevModeWrapper devModeEnabled={false}>{TEST_STRING}</DevModeWrapper>
  )

  expect(queryByTestId(DevModeWrapperTestIds.Container)).not.toBeInTheDocument()
})

test("renders children when is enabled", () => {
  const { queryByText } = renderWithThemeAndIntl(
    <DevModeWrapper devModeEnabled>{TEST_STRING}</DevModeWrapper>
  )

  expect(queryByText(TEST_STRING)).toBeInTheDocument()
})

test("can be toggled", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <DevModeWrapper devModeEnabled>{TEST_STRING}</DevModeWrapper>
  )

  expect(getByTestId(DevModeWrapperTestIds.Inner)).toHaveStyle("display: block")
  getByTestId(DevModeWrapperTestIds.ToggleButton).click()
  expect(getByTestId(DevModeWrapperTestIds.Inner)).toHaveStyle("display: none")
})
