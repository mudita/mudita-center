/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import React, { ComponentProps } from "react"
import AboutUI from "./about-ui.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { AboutTestIds } from "App/settings/components/about/about.enum"
import { screen, waitFor } from "@testing-library/dom"
import { AppUpdateStepModalTestIds } from "App/__deprecated__/renderer/wrappers/app-update-step-modal/app-update-step-modal-test-ids.enum"
import { flags } from "App/feature-flags"
import store from "App/__deprecated__/renderer/store"
import { Provider } from "react-redux"

jest.mock("App/feature-flags")
jest.mock(
  "App/__deprecated__/main/functions/register-error-app-update-listener"
)

type Props = ComponentProps<typeof AboutUI>
const defaultProps: Props = {
  openLicense: noop,
  openTermsOfService: noop,
  openPrivacyPolicy: noop,
  onAppUpdateAvailableCheck: noop,
  hideAppUpdateNotAvailable: noop,
  appLatestVersion: "0.20.2",
  appCurrentVersion: "0.19.0",
  appUpdateAvailable: true,
  appUpdateNotAvailableShow: false,
  checkingForUpdate: false,
}

const renderer = (extraProps?: Partial<Props>) => {
  const props: Props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(
    <Provider store={store}>
      <AboutUI {...props} />
    </Provider>
  )
  return {
    ...outcome,
  }
}

test("renders wrapper properly", () => {
  const { queryByTestId } = renderer()
  expect(queryByTestId(AboutTestIds.Wrapper)).toBeInTheDocument()
})

test("renders at least one table row", () => {
  const { queryAllByTestId } = renderer()
  expect(queryAllByTestId(AboutTestIds.TableRow).length).toBeGreaterThanOrEqual(
    1
  )
})

test("Opens update modal properly when app update is not available", async () => {
  const { getByTestId } = renderer({
    appLatestVersion: "0.20.2",
    appCurrentVersion: "0.20.2",
    appUpdateNotAvailableShow: true,
    appUpdateAvailable: false,
  })

  const button = getByTestId(AboutTestIds.UpdateButton)
  await waitFor(() => {
    expect(button).toBeEnabled()
  })
  button.click()

  await waitFor(() => {
    expect(
      screen.getByTestId(AppUpdateStepModalTestIds.AppUpdateNotAvailableModal)
    ).toBeInTheDocument()
  })
})

test("Calls AppUpdateAvailableCheck when clicked", async () => {
  jest.spyOn(flags, "get").mockReturnValueOnce(true)
  const onAppUpdateAvailableCheck = jest.fn()
  const { getByTestId } = renderer({
    onAppUpdateAvailableCheck,
    appUpdateAvailable: false,
  })
  const button = getByTestId(AboutTestIds.UpdateButton)
  await waitFor(() => {
    expect(button).toBeEnabled()
  })
  button.click()
  await waitFor(() => {
    expect(onAppUpdateAvailableCheck).toHaveBeenCalledTimes(1)
  })
})
