/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

import DevMode from "Renderer/modules/help/devmode/devmode.component"
import { DevModeTestIds } from "Renderer/modules/help/devmode/devmode.interface"

test("DevMode is rendered", () => {
  const disable = () => false
  const { getByTestId } = renderWithThemeAndIntl(<DevMode disable={disable} />)
  expect(getByTestId(DevModeTestIds.Wrapper)).toBeInTheDocument()
})
