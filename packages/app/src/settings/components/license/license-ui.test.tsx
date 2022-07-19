/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { Router } from "react-router"
import history from "App/__deprecated__/renderer/routes/history"
import { LicenseUI } from "./license-ui.component"
import { LicenseComponentTestIds } from "./license-ui.enum"

const renderer = () => {
  return renderWithThemeAndIntl(
    <Router history={history}>
      <LicenseUI />
    </Router>
  )
}

test("License component renders", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(LicenseComponentTestIds.Wrapper)).toBeInTheDocument()
})

test("render title correctly", () => {
  const titleText = "Mudita Center Software – Terms of Use"
  const { getByTestId } = renderer()
  expect(getByTestId(LicenseComponentTestIds.Title)).toHaveTextContent(
    titleText
  )
})
