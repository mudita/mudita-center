/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import React, { ComponentProps } from "react"
import AboutUI from "./about-ui.component"
import { noop } from "App/renderer/utils/noop"
import { AboutTestIds } from "./about.enum"
import { fireEvent, screen } from "@testing-library/dom"
import { AppUpdateStepModalTestIds } from "Renderer/wrappers/app-update-step-modal/app-update-step-modal-test-ids.enum"
import { flags } from "App/feature-flags"

jest.mock("App/feature-flags")

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
  appUpdateNotAvailableShow: false
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

test("Opens update modal properly when app update is not available", () => {
  renderer({
    appLatestVersion: "0.20.2",
    appCurrentVersion: "0.20.2",
    appUpdateNotAvailableShow: true,
  })

  expect(
    screen.getByTestId(AppUpdateStepModalTestIds.AppUpdateNotAvailableModal)
  ).toBeInTheDocument()
})

test("Calls AppUpdateAvailableCheck when clicked", () => {
  jest.spyOn(flags, "get").mockReturnValueOnce(true)
  const onAppUpdateAvailableCheck = jest.fn()
  const { queryByTestId } = renderer({ onAppUpdateAvailableCheck })
  fireEvent.click(queryByTestId(AboutTestIds.UpdateButton) as HTMLElement)
  expect(onAppUpdateAvailableCheck).toHaveBeenCalledTimes(1)
})
