/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { TermsOfServiceUI } from "Core/settings/components/terms-of-service/terms-of-service-ui.component"
import { TermsOfServiceComponentTestIds } from "Core/settings/components/terms-of-service/terms-of-service-ui.enum"

const renderer = () => {
  return renderWithThemeAndIntl(<TermsOfServiceUI />)
}

test("License component renders", () => {
  const { getByTestId } = renderer()
  expect(
    getByTestId(TermsOfServiceComponentTestIds.Wrapper)
  ).toBeInTheDocument()
})

test("render title correctly", () => {
  const titleText = "Mudita Center Terms of Service"
  const { getByTestId } = renderer()
  expect(getByTestId(TermsOfServiceComponentTestIds.Title)).toHaveTextContent(
    titleText
  )
})
