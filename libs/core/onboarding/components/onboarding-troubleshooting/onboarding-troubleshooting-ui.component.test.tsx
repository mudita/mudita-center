/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import OnboardingTroubleshootingUI from "Core/onboarding/components/onboarding-troubleshooting/onboarding-troubleshooting-ui.component"
import { OnboardingTroubleshootingUiTestIds } from "Core/onboarding/components/onboarding-troubleshooting/onboarding-troubleshooting-ui-test-ids"

test("troubleshooting retry button works properly", () => {
  const onRetry = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <OnboardingTroubleshootingUI onRetry={onRetry} />
  )

  fireEvent.click(getByTestId(OnboardingTroubleshootingUiTestIds.Retry))
  expect(onRetry).toBeCalled()
})

test("troubleshooting contact button works properly", () => {
  const onContact = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <OnboardingTroubleshootingUI onContact={onContact} />
  )

  fireEvent.click(getByTestId(OnboardingTroubleshootingUiTestIds.ContactSupport))
  expect(onContact).toBeCalled()
})

test("troubleshooting more instructions button works properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(<OnboardingTroubleshootingUI />)
  fireEvent.click(getByTestId(OnboardingTroubleshootingUiTestIds.MoreInstructions))
  expect(getByTestId(OnboardingTroubleshootingUiTestIds.MoreSteps)).toBeInTheDocument()
})
