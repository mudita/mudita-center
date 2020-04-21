import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Settings from "Renderer/modules/settings/settings.component"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(<Settings />)
  expect(container).toMatchSnapshot()
})

test("togglers have their own states, off buttons are active by default", async () => {
  const { queryAllByRole } = renderWithThemeAndIntl(<Settings />)
  const buttons = queryAllByRole("button")
  const autostartOffButton = buttons[0]
  const autostartOnButton = buttons[1]
  const tetheringOffButton = buttons[2]
  const tetheringOnButton = buttons[3]

  expect(autostartOffButton).toHaveAttribute(
    "data-testid",
    "autostart-toggler-active"
  )
  await fireEvent.click(autostartOnButton)
  expect(autostartOnButton).toHaveAttribute(
    "data-testid",
    "autostart-toggler-active"
  )
  expect(autostartOffButton).toHaveAttribute(
    "data-testid",
    "autostart-toggler-inactive"
  )
  expect(tetheringOffButton).toHaveAttribute(
    "data-testid",
    "tethering-toggler-active"
  )
  expect(tetheringOnButton).toHaveAttribute(
    "data-testid",
    "tethering-toggler-inactive"
  )
})
