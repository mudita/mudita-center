/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import OnboardingTroubleshooting from "App/__deprecated__/troubleshooting/components/onboarding-troubleshooting.component"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/require-await
test("troubleshooting retry button works properly", async () => {
  const onRetry = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <OnboardingTroubleshooting onRetry={onRetry} />
  )

  fireEvent.click(getByTestId("retry"))
  expect(onRetry).toBeCalled()
})

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/require-await
test("troubleshooting contact button works properly", async () => {
  const onContact = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <OnboardingTroubleshooting onContact={onContact} />
  )

  fireEvent.click(getByTestId("contact-support"))
  expect(onContact).toBeCalled()
})

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/require-await
test("troubleshooting more instructions button works properly", async () => {
  const { getByTestId } = renderWithThemeAndIntl(<OnboardingTroubleshooting />)
  fireEvent.click(getByTestId("more-instructions"))
  expect(getByTestId("more-steps")).toBeInTheDocument()
})
