/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React, { ComponentProps } from "react"
import AboutUI from "./about-ui.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { AboutTestIds } from "App/settings/components/about/about.enum"
import { fireEvent, screen } from "@testing-library/dom"
import { AppUpdateStepModalTestIds } from "App/__deprecated__/renderer/wrappers/app-update-step-modal/app-update-step-modal-test-ids.enum"
import { flags } from "App/feature-flags"
import { act, waitFor } from "@testing-library/react"

jest.mock("App/feature-flags")
jest.mock("electron-better-ipc", () => {
  return {
    ipcRenderer: {
      callMain: () => jest.fn(),
      answerMain: () => jest.fn(),
    },
  }
})

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
  appUpdateFailedShow: false,
  hideAppUpdateFailed: noop,
}

const renderer = (extraProps?: Partial<Props>) => {
  const props: Props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(<AboutUI {...props} />)
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
  })

  act(() => getByTestId(AboutTestIds.UpdateButton).click())
  await waitFor(() => {
    expect(
      screen.getByTestId(AppUpdateStepModalTestIds.AppUpdateNotAvailableModal)
    ).toBeInTheDocument()
  })
})

test("Calls AppUpdateAvailableCheck when clicked", () => {
  jest.spyOn(flags, "get").mockReturnValueOnce(true)
  const onAppUpdateAvailableCheck = jest.fn()
  const { queryByTestId } = renderer({ onAppUpdateAvailableCheck })
  fireEvent.click(queryByTestId(AboutTestIds.UpdateButton) as HTMLElement)
  expect(onAppUpdateAvailableCheck).toHaveBeenCalledTimes(1)
})
