/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { LicenseUI } from "Core/settings/components/license/license-ui.component"
import { LicenseComponentTestIds } from "Core/settings/components/license/license-ui.enum"

const renderer = () => {
  return renderWithThemeAndIntl(<LicenseUI />)
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
