/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import OnboardingWelcome from "App/onboarding/components/onboarding-welcome.component"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/require-await
test("onboarding: welcome Not now button works properly", async () => {
  const onCancel = jest.fn()
  const { getByText } = renderWithThemeAndIntl(
    <OnboardingWelcome onCancel={onCancel} />
  )

  fireEvent.click(getByText("[value] module.onboarding.welcomeButton"))
  expect(onCancel).toBeCalled()
})

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/require-await
test("onboarding: phone doesn't show up button works properly button works properly", async () => {
  const onTroubleshooting = jest.fn()
  const { getByText } = renderWithThemeAndIntl(
    <OnboardingWelcome onTroubleshooting={onTroubleshooting} />
  )

  fireEvent.click(
    getByText("[value] module.onboarding.welcomeTroubleshootingButton")
  )
  expect(onTroubleshooting).toBeCalled()
})
