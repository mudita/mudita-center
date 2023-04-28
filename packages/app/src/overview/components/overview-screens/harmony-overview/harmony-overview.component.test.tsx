/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { HarmonyOverview } from "App/overview/components/overview-screens/harmony-overview/harmony-overview.component"
import { StatusTestIds } from "App/overview/components/status/status-test-ids.enum"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"
import { DownloadState, SilentCheckForUpdateState } from "App/update/constants"
import store from "App/__deprecated__/renderer/store"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import { CheckForUpdateState } from "App/update/constants/check-for-update-state.constant"

jest.mock("App/feature-flags")

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: jest.fn(),
      append: jest.fn(),
    }),
    MenuItem: () => jest.fn(),
  },
}))

type Props = ComponentProps<typeof HarmonyOverview>

const defaultProps: Props = {
  batteryLevel: undefined,
  osVersion: "1.0.0",
  serialNumber: undefined,
  startUpdateOs: jest.fn(),
  disconnectDevice: jest.fn(),
  openContactSupportFlow: jest.fn(),
  abortDownload: jest.fn(),
  allReleases: [],
  checkForUpdate: jest.fn(),
  updatingState: State.Initial,
  checkingForUpdateState: CheckForUpdateState.Initial,
  downloadingState: DownloadState.Initial,
  silentCheckForUpdateState: SilentCheckForUpdateState.Initial,
  clearUpdateState: jest.fn(),
  downloadUpdates: jest.fn(),
  availableReleasesForUpdate: null,
  updateOsError: null,
  downloadingReleasesProcessStates: null,
  updatingReleasesProcessStates: null,
  areAllReleasesDownloaded: false,
  setCheckForUpdateState: jest.fn(),
  forceUpdateNeeded: false,
  forceUpdate: jest.fn(),
  forceUpdateState: State.Initial,
  closeForceUpdateFlow: jest.fn(),
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(
    <Provider store={store}>
      <HarmonyOverview {...props} />
    </Provider>
  )
}

test("Renders Mudita harmony data", () => {
  const { getByTestId, queryByTestId, queryByText } = render()

  expect(getByTestId(StatusTestIds.BatteryLevel)).toHaveTextContent("0 %")
  expect(queryByTestId(StatusTestIds.NetworkName)).not.toBeInTheDocument()
  queryByText(intl.formatMessage({ id: "module.overview.statusHarmonyTitle" }))
  expect(getByTestId(SystemTestIds.OsVersion)).toHaveTextContent("1.0.0")
})
