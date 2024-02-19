/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import OnboardingTroubleshootingUI from "Core/onboarding/components/onboarding-troubleshooting/onboarding-troubleshooting-ui.component"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/require-await
test("troubleshooting retry button works properly", async () => {
  const onRetry = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <OnboardingTroubleshootingUI onRetry={onRetry} />
  )

  fireEvent.click(getByTestId("retry"))
  expect(onRetry).toBeCalled()
})

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/require-await
test("troubleshooting contact button works properly", async () => {
  const onContact = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <OnboardingTroubleshootingUI onContact={onContact} />
  )

  fireEvent.click(getByTestId("contact-support"))
  expect(onContact).toBeCalled()
})

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/require-await
test("troubleshooting more instructions button works properly", async () => {
  const { getByTestId } = renderWithThemeAndIntl(<OnboardingTroubleshootingUI />)
  fireEvent.click(getByTestId("more-instructions"))
  expect(getByTestId("more-steps")).toBeInTheDocument()
})
