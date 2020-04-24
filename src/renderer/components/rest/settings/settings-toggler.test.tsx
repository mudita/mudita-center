import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import SettingsToggler from "Renderer/components/rest/settings/settings-toggler.component"
import { fireEvent } from "@testing-library/dom"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"

test("off button is active by default", async () => {
  const changeToggleValue = jest.fn()
  const { queryAllByRole } = renderWithThemeAndIntl(
    <SettingsToggler
      changeToggleValue={changeToggleValue}
      toggleValue={ToggleState.Off}
    />
  )
  const buttons = queryAllByRole("button")
  const offButton = buttons[0]

  expect(offButton).toHaveAttribute("data-testid", "toggler-active")
})

test("passed function is called with right argument", async () => {
  const changeToggleValue = jest.fn()
  const { queryAllByRole } = renderWithThemeAndIntl(
    <SettingsToggler
      changeToggleValue={changeToggleValue}
      toggleValue={ToggleState.Off}
    />
  )
  const [, onButton] = queryAllByRole("button")

  await fireEvent.click(onButton)
  expect(changeToggleValue).toBeCalledWith(ToggleState.On)
})

test("informs about toggle", async () => {
  const changeToggleValue = jest.fn()
  const { queryAllByRole } = renderWithThemeAndIntl(
    <SettingsToggler changeToggleValue={changeToggleValue} />
  )
  const [, onButton] = queryAllByRole("button")
  await fireEvent.click(onButton)
  expect(changeToggleValue).toHaveBeenCalled()
})

test("onToggle is triggered when inactive button is clicked", async () => {
  const changeToggleValue = jest.fn()
  const onToggle = jest.fn()
  const { queryAllByRole } = renderWithThemeAndIntl(
    <SettingsToggler
      changeToggleValue={changeToggleValue}
      onToggle={onToggle}
    />
  )
  const [, onButton] = queryAllByRole("button")
  await fireEvent.click(onButton)
  expect(onToggle).toHaveBeenCalled()
  expect(onToggle).toBeCalledWith(ToggleState.On)
})
