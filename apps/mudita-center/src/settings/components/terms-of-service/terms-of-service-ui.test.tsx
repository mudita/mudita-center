/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { Router } from "react-router"
import history from "App/__deprecated__/renderer/routes/history"
import { TermsOfServiceUI } from "App/settings/components/terms-of-service/terms-of-service-ui.component"
import { TermsOfServiceComponentTestIds } from "App/settings/components/terms-of-service/terms-of-service-ui.enum"

const renderer = () => {
  return renderWithThemeAndIntl(
    <Router history={history}>
      <TermsOfServiceUI />
    </Router>
  )
}

test("License component renders", () => {
  const { getByTestId } = renderer()
  expect(
    getByTestId(TermsOfServiceComponentTestIds.Wrapper)
  ).toBeInTheDocument()
})

test("render title correctly", () => {
  const titleText = "Mudita Center Terms of Use"
  const { getByTestId } = renderer()
  expect(getByTestId(TermsOfServiceComponentTestIds.Title)).toHaveTextContent(
    titleText
  )
})
