import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import SettingsToggler from "Renderer/components/rest/settings/settings-toggler.component"
import { fireEvent } from "@testing-library/dom"
import { twoStateToggler } from "Renderer/modules/settings/settings-toggler-state"

test("off button is active by default", async () => {
  const { queryAllByRole } = renderWithThemeAndIntl(
    <SettingsToggler togglerState={twoStateToggler} />
  )
  const buttons = queryAllByRole("button")
  const offButton = buttons[0]

  expect(offButton).toHaveAttribute("data-testid", "toggler-active")
})

test("on button clicked becomes active, off button becomes inactive", async () => {
  const { queryAllByRole } = renderWithThemeAndIntl(
    <SettingsToggler togglerState={twoStateToggler} />
  )
  const buttons = queryAllByRole("button")
  const offButton = buttons[0]
  const onButton = buttons[1]

  expect(offButton).toHaveAttribute("data-testid", "toggler-active")
  await fireEvent.click(onButton)
  expect(offButton).toHaveAttribute("data-testid", "toggler-inactive")
  expect(onButton).toHaveAttribute("data-testid", "toggler-active")
})

test("onToggleValueChange function is called after click when passed", async () => {
  const onToggleValueChange = jest.fn()
  const { queryAllByRole } = renderWithThemeAndIntl(
    <SettingsToggler
      togglerState={twoStateToggler}
      onToggleValueChange={onToggleValueChange}
    />
  )
  const buttons = queryAllByRole("button")
  const onButton = buttons[1]
  await fireEvent.click(onButton)
  expect(onToggleValueChange).toHaveBeenCalled()
})
