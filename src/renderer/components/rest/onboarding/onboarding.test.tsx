import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import OnboardingWelcome from "Renderer/components/rest/onboarding/onboarding-welcome.component"
import { fireEvent } from "@testing-library/dom"
import { wait } from "@testing-library/react"

test("welcome: continue button works properly", async () => {
  const onContinue = jest.fn()
  const { getByRole } = renderWithThemeAndIntl(
    <OnboardingWelcome onContinue={onContinue} />
  )

  fireEvent.click(getByRole("button"))

  await wait(() => {
    expect(onContinue).toBeCalled()
  })
})

test("welcome: autostart checkbox works properly", async () => {
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
