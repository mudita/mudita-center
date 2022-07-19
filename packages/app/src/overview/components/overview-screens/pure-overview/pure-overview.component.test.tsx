/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { CaseColour } from "@mudita/pure"
import { Provider } from "react-redux"
import { Router } from "react-router"
import store from "App/__deprecated__/renderer/store"
import history from "App/__deprecated__/renderer/routes/history"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { PureOverview } from "App/overview/components/overview-screens/pure-overview/pure-overview.component"
import { UpdatingState } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"
import { StatusTestIds } from "App/overview/components/status/status-test-ids.enum"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { BackupDeviceDataState } from "App/backup-device/reducers"
import { RestoreDeviceDataState } from "App/restore-device/reducers"
import { SynchronizationState } from "App/data-sync/reducers"
import { ErrorSyncModalTestIds } from "App/connecting/components/error-sync-modal/error-sync-modal-test-ids.enum"

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: jest.fn(),
      append: jest.fn(),
    }),
    MenuItem: () => jest.fn(),
  },
}))

type Props = ComponentProps<typeof PureOverview>

const defaultProps: Props = {
  openContactSupportFlow: jest.fn(),
  backupDeviceState: BackupDeviceDataState.Empty,
  backups: [],
  caseColour: CaseColour.Black,
  networkLevel: 0,
  readBackupDeviceDataState: jest.fn(),
  readRestoreDeviceDataState: jest.fn(),
  restoreDeviceState: RestoreDeviceDataState.Empty,
  startBackupDevice: jest.fn(),
  startRestoreDevice: jest.fn(),
  setUpdateState: jest.fn(),
  startUpdateOs: jest.fn(),
  lowestSupportedOsVersion: undefined,
  batteryLevel: 0,
  disconnectDevice: jest.fn(),
  lastBackupDate: new Date("2020-01-15T07:35:01.562Z"),
  lastAvailableOsVersion: "",
  networkName: "network name",
  osVersion: "1.0.0",
  pureOsDownloaded: false,
  pureOsBackupLocation: "path/location/backup",
  serialNumber: undefined,
  updatePhoneOsInfo: jest.fn(),
  updatingState: UpdatingState.Standby,
  memorySpace: {
    free: 100,
    full: 200,
    total: 200,
  },
  syncState: SynchronizationState.Loaded,
  updateAllIndexes: jest.fn(),
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(
    <Router history={history}>
      <Provider store={store}>
        <PureOverview {...props} />
      </Provider>
    </Router>
  )
}

test("Renders Mudita pure data", () => {
  const { getByTestId, queryByText } = render()
  expect(getByTestId(StatusTestIds.BatteryLevel)).toHaveTextContent("0 %")
  expect(getByTestId(StatusTestIds.NetworkName)).toHaveTextContent(
    "network name"
  )
  queryByText(intl.formatMessage({ id: "module.overview.statusPureTitle" }))
  expect(getByTestId(SystemTestIds.OsVersion)).toHaveTextContent("1.0.0")
})

test("PureOverview shows Sync error modal if sync error occurred", () => {
  const { getByTestId } = render({ syncState: SynchronizationState.Error })
  expect(getByTestId(ErrorSyncModalTestIds.Container)).toBeInTheDocument()
})
