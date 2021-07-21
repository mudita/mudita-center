/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import OnboardingWelcome from "Renderer/components/rest/onboarding/onboarding-welcome.component"
import { fireEvent } from "@testing-library/dom"
import OnboardingConnecting from "Renderer/components/rest/onboarding/onboarding-connecting.component"
import OnboardingTroubleshooting from "Renderer/components/rest/onboarding/onboarding-troubleshooting.component"

test("onboarding: welcome Not now button works properly", async () => {
  const onCancel = jest.fn()
  const { getByText } = renderWithThemeAndIntl(
    <OnboardingWelcome onCancel={onCancel} />
  )

  fireEvent.click(getByText("[value] module.onboarding.welcomeButton"))
  expect(onCancel).toBeCalled()
})

test("onboarding: phone doesn't show up button works properly button works properly", async () => {
  const onTroubleshooting = jest.fn()
  const { getByText } = renderWithThemeAndIntl(
    <OnboardingWelcome onTroubleshooting={onTroubleshooting} />
  )

  fireEvent.click(getByText("[value] module.onboarding.welcomeTroubleshootingButton"))
  expect(onTroubleshooting).toBeCalled()
})

test("onboarding: connecting cancel button works properly", async () => {
  const onCancel = jest.fn()
  const { getByRole } = renderWithThemeAndIntl(
    <OnboardingConnecting onCancel={onCancel} />
  )

  fireEvent.click(getByRole("button"))
  expect(onCancel).toBeCalled()
})

test("onboarding: troubleshooting retry button works properly", async () => {
  const onRetry = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <OnboardingTroubleshooting onRetry={onRetry} />
  )

  fireEvent.click(getByTestId("retry"))
  expect(onRetry).toBeCalled()
})

test("onboarding: troubleshooting contact button works properly", async () => {
  const onContact = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <OnboardingTroubleshooting onContact={onContact} />
  )

  fireEvent.click(getByTestId("contact-support"))
  expect(onContact).toBeCalled()
})

test("onboarding: troubleshooting more instructions button works properly", async () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <OnboardingTroubleshooting />
  )
  fireEvent.click(getByTestId("more-instructions"))
  expect(getByTestId("more-steps")).toBeInTheDocument()
})
