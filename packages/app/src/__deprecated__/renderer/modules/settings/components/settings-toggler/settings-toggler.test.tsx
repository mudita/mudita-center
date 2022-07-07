/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import SettingsToggler from "App/__deprecated__/renderer/modules/settings/components/settings-toggler/settings-toggler.component"
import { fireEvent } from "@testing-library/dom"
import { SettingsTogglerTestIds } from "App/__deprecated__/renderer/modules/settings/components/settings-toggler/settings-toggler-test-ids.enum"

test("off button is active by default", async () => {
  const onToggle = jest.fn()
  const { queryAllByRole } = renderWithThemeAndIntl(
    <SettingsToggler onToggle={onToggle} toggleValue={false} />
  )
  const buttons = queryAllByRole("button")
  const offButton = buttons[0]

  expect(offButton).toHaveAttribute(
    "data-testid",
    SettingsTogglerTestIds.Active
  )
})

test("passed function is called with right argument", async () => {
  const onToggle = jest.fn()
  const { queryAllByRole } = renderWithThemeAndIntl(
    <SettingsToggler onToggle={onToggle} toggleValue={false} />
  )
  const [, onButton] = queryAllByRole("button")

  await fireEvent.click(onButton)
  expect(onToggle).toBeCalledWith(true)
})

test("informs about toggle", async () => {
  const onToggle = jest.fn()
  const { queryAllByRole } = renderWithThemeAndIntl(
    <SettingsToggler onToggle={onToggle} />
  )
  const [, onButton] = queryAllByRole("button")
  await fireEvent.click(onButton)
  expect(onToggle).toHaveBeenCalled()
})
