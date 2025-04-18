/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "Core/core/constants"
import { HarmonyOverview } from "Core/overview/components/overview-screens/harmony-overview/harmony-overview.component"
import { StatusTestIds } from "Core/overview/components/status/status-test-ids.enum"
import { SystemTestIds } from "Core/overview/components/system/system-test-ids.enum"
import { DownloadState, SilentCheckForUpdateState } from "Core/update/constants"
import store from "Core/__deprecated__/renderer/store"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import { CheckForUpdateState } from "Core/update/constants/check-for-update-state.constant"
import { CaseColour } from "core-device/models"
import { TimeSynchronizationTestIds } from "Core/overview/components/time-synchronization/time-synchronization-ids.enum"
import { selectSynchronizedTime } from "Core/time-synchronization/selectors/synchronized-time.selector"

jest.mock("Core/settings/store/schemas/generate-application-id", () => ({
  generateApplicationId: () => "123",
}))

jest.mock("Core/feature-flags")

jest.mock("@electron/remote", () => ({
  Menu: () => ({
    popup: jest.fn(),
    append: jest.fn(),
  }),
  MenuItem: () => jest.fn(),
}))

jest.mock(
  "Core/time-synchronization/selectors/synchronized-time.selector",
  () => {
    return {
      selectSynchronizedTime: jest.fn(() => undefined),
    }
  }
)

type Props = ComponentProps<typeof HarmonyOverview>

const defaultProps: Props = {
  caseColour: CaseColour.Gray,
  batteryLevel: undefined,
  osVersion: "1.0.0",
  serialNumber: undefined,
  startUpdateOs: jest.fn(),
  openContactSupportFlow: jest.fn(),
  abortDownload: jest.fn(),
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
  synchronizeTime: jest.fn(),
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
  expect(
    queryByTestId(TimeSynchronizationTestIds.SynchronizeButton)
  ).not.toBeInTheDocument()
})

test("Renders time synchronization box when feature is available", () => {
  const mockDate = new Date("2021-12-31T13:45:00Z")
  ;(selectSynchronizedTime as unknown as jest.Mock).mockReturnValue(mockDate)
  const { queryByTestId, getByText } = render()

  const time = Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(mockDate)

  const date = Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(mockDate)

  expect(
    queryByTestId(TimeSynchronizationTestIds.SynchronizeButton)
  ).toBeInTheDocument()
  expect(getByText(date)).toBeInTheDocument()
  expect(getByText(time)).toBeInTheDocument()
})
