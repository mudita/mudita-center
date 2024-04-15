/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import { ErrorSyncModalTestIds } from "Core/connecting/components/error-sync-modal/error-sync-modal-test-ids.enum"
import { State } from "Core/core/constants"
import { SynchronizationStatus } from "Core/data-sync/reducers"
import { CaseColour } from "Core/device/constants"
import { PureOverview } from "Core/overview/components/overview-screens/pure-overview/pure-overview.component"
import { StatusTestIds } from "Core/overview/components/status/status-test-ids.enum"
import { SystemTestIds } from "Core/overview/components/system/system-test-ids.enum"
import { DownloadState, SilentCheckForUpdateState } from "Core/update/constants"
import store from "Core/__deprecated__/renderer/store"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { CheckForUpdateState } from "Core/update/constants/check-for-update-state.constant"

// TODO [mw] add integration tests for update process - scope of the next PR (after all the changes from CP-1681 are done)

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

type Props = ComponentProps<typeof PureOverview>

const defaultProps: Props = {
  openContactSupportFlow: jest.fn(),
  backupDeviceState: State.Initial,
  backups: [],
  caseColour: CaseColour.Black,
  networkLevel: 0,
  readBackupDeviceDataState: jest.fn(),
  readRestoreDeviceDataState: jest.fn(),
  restoreDeviceState: State.Initial,
  startBackupDevice: jest.fn(),
  startRestoreDevice: jest.fn(),
  startUpdateOs: jest.fn(),
  batteryLevel: 0,
  lastBackupDate: new Date("2020-01-15T07:35:01.562Z"),
  networkName: "network name",
  osVersion: "1.0.0",
  pureOsBackupLocation: "path/location/backup",
  serialNumber: undefined,
  memorySpace: {
    reservedSpace: 100,
    usedUserSpace: 200,
    total: 200,
  },
  syncState: SynchronizationStatus.Loaded,
  updateAllIndexes: jest.fn(),
  abortDownload: jest.fn(),
  checkForUpdate: jest.fn(),
  updatingState: State.Initial,
  checkingForUpdateState: CheckForUpdateState.Initial,
  downloadingState: DownloadState.Initial,
  silentCheckForUpdateState: SilentCheckForUpdateState.Initial,
  clearUpdateState: jest.fn(),
  downloadUpdates: jest.fn(),
  setCheckForUpdateState: jest.fn(),
  availableReleasesForUpdate: null,
  updateOsError: null,
  downloadingReleasesProcessStates: null,
  updatingReleasesProcessStates: null,
  areAllReleasesDownloaded: false,
  backupError: null,
  forceUpdateNeeded: false,
  forceUpdate: jest.fn(),
  forceUpdateState: State.Initial,
  closeForceUpdateFlow: jest.fn(),
  backupActionDisabled: false,
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(
    <Provider store={store}>
      <PureOverview {...props} />
    </Provider>
  )
}

afterEach(() => {
  jest.clearAllMocks()
})

test("Renders Mudita pure data", () => {
  const { getByTestId, queryByText } = render()
  expect(getByTestId(StatusTestIds.BatteryLevel)).toHaveTextContent("0 %")
  expect(getByTestId(StatusTestIds.NetworkName)).toHaveTextContent(
    "network name"
  )
  queryByText(intl.formatMessage({ id: "module.overview.statusPureTitle" }))
  expect(getByTestId(SystemTestIds.OsVersion)).toHaveTextContent("1.0.0")
})

describe("`ErrorSyncModal` logic", () => {
  test("when sync error occurred and `restoreDeviceState` is undefined modal is visible", () => {
    const { queryByTestId } = render({
      restoreDeviceState: undefined,
      syncState: SynchronizationStatus.Error,
    })
    expect(queryByTestId(ErrorSyncModalTestIds.Container)).toBeInTheDocument()
  })
  test("when sync error occurred and `restoreDeviceState` has empty state modal is visible", () => {
    const { queryByTestId } = render({
      restoreDeviceState: State.Initial,
      syncState: SynchronizationStatus.Error,
    })
    expect(queryByTestId(ErrorSyncModalTestIds.Container)).toBeInTheDocument()
  })
  test("when sync error occurred and `restoreDeviceState` has failed state modal isn't visible", () => {
    const { queryByTestId } = render({
      restoreDeviceState: State.Failed,
      syncState: SynchronizationStatus.Error,
    })
    expect(
      queryByTestId(ErrorSyncModalTestIds.Container)
    ).not.toBeInTheDocument()
  })
  test("when sync error occurred and `restoreDeviceState` has loading state modal isn't visible", () => {
    const { queryByTestId } = render({
      restoreDeviceState: State.Loading,
      syncState: SynchronizationStatus.Error,
    })
    expect(
      queryByTestId(ErrorSyncModalTestIds.Container)
    ).not.toBeInTheDocument()
  })
  test("when sync error occurred and `restoreDeviceState` has loaded state modal isn't visible", () => {
    const { queryByTestId } = render({
      restoreDeviceState: State.Loaded,
      syncState: SynchronizationStatus.Error,
    })
    expect(
      queryByTestId(ErrorSyncModalTestIds.Container)
    ).not.toBeInTheDocument()
  })
})
