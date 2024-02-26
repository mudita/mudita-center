/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import OnboardingUI from "Core/onboarding/components/onboarding/onboarding-ui.component"

test("onboarding: welcome Not now button works properly", () => {
  const onCancel = jest.fn()
  const { getByText } = renderWithThemeAndIntl(
    <OnboardingUI onCancel={onCancel} />
  )

  fireEvent.click(getByText("[value] module.onboarding.primaryButton"))
  expect(onCancel).toBeCalled()
})

test("onboarding: phone doesn't show up button works properly button works properly", () => {
  const onTroubleshooting = jest.fn()
  const { getByText } = renderWithThemeAndIntl(
    <OnboardingUI onTroubleshooting={onTroubleshooting} />
  )

  fireEvent.click(
    getByText("[value] module.onboarding.secondaryButton")
  )
  expect(onTroubleshooting).toBeCalled()
})
