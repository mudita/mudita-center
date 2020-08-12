import React from "react"

import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.component"

import { DevModeWrapperTestIds } from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.enum"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const TEST_STRING = "Hello there"

const renderer = (devModeEnabled = true) => {
  return renderWithThemeAndIntl(
    <DevModeWrapper devModeEnabled={devModeEnabled}>
      {TEST_STRING}
    </DevModeWrapper>
  )
}

test("renders nothing when is disabled", () => {
  const { queryByTestId } = renderer(false)

  expect(queryByTestId(DevModeWrapperTestIds.Container)).not.toBeInTheDocument()
})

test("renders children when is enabled", () => {
  const { queryByText } = renderer()

  expect(queryByText(TEST_STRING)).toBeInTheDocument()
})

test("can be toggled", () => {
  const { getByTestId } = renderer()

  expect(getByTestId(DevModeWrapperTestIds.Inner)).toHaveStyle("display: block")
  getByTestId(DevModeWrapperTestIds.ToggleButton).click()
  expect(getByTestId(DevModeWrapperTestIds.Inner)).toHaveStyle("display: none")
})
