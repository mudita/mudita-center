import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import OnboardingWelcome from "Renderer/components/rest/onboarding/onboarding-welcome.component"
import { fireEvent } from "@testing-library/dom"
import { wait } from "@testing-library/react"
import OnboardingConnecting from "Renderer/components/rest/onboarding/onboarding-connecting.component"
import OnboardingTroubleshooting from "Renderer/components/rest/onboarding/onboarding-troubleshooting.component"

test("onboarding: welcome continue button works properly", async () => {
  const onContinue = jest.fn()
  const { getByRole } = renderWithThemeAndIntl(
    <OnboardingWelcome onContinue={onContinue} />
  )

  fireEvent.click(getByRole("button"))

  await wait(() => {
    expect(onContinue).toBeCalled()
  })
})

test("onboarding: welcome autostart checkbox works properly", async () => {
  const setAutostartOption = jest.fn()
  const { getByRole } = renderWithThemeAndIntl(
    <OnboardingWelcome setAutostartOption={setAutostartOption} />
  )

  fireEvent.click(getByRole("checkbox"))

  await wait(() => {
    expect(setAutostartOption).toBeCalledWith(true)
  })

  fireEvent.click(getByRole("checkbox"))

  await wait(() => {
    expect(setAutostartOption).toBeCalledWith(false)
  })
})

test("onboarding: connecting cancel button works properly", async () => {
  const onCancel = jest.fn()
  const { getByRole } = renderWithThemeAndIntl(
    <OnboardingConnecting onCancel={onCancel} />
  )

  fireEvent.click(getByRole("button"))

  await wait(() => {
    expect(onCancel).toBeCalled()
  })
})

test("onboarding: troubleshooting retry button works properly", async () => {
  const onRetry = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <OnboardingTroubleshooting onRetry={onRetry} />
  )

  fireEvent.click(getByTestId("retry"))

  await wait(() => {
    expect(onRetry).toBeCalled()
  })
})

test("onboarding: troubleshooting contact button works properly", async () => {
  const onContact = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <OnboardingTroubleshooting onContact={onContact} />
  )

  fireEvent.click(getByTestId("contact-support"))

  await wait(() => {
    expect(onContact).toBeCalled()
  })
})
