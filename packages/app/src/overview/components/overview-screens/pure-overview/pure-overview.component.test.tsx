/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import { Router } from "react-router"
import store from "Renderer/store"
import history from "Renderer/routes/history"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { PureOverview } from "App/overview/components/overview-screens/pure-overview/pure-overview.component"
import {
  DataState,
  UpdatingState,
} from "Renderer/models/basic-info/basic-info.typings"
import { ConversionFormat, Convert } from "App/main/store/settings.interface"
import { StatusTestIds } from "App/overview/components/status/status-test-ids.enum"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"
import { intl } from "Renderer/utils/intl"
import { BackupDeviceDataState } from "App/backup-device/reducers"
import { RestoreDeviceDataState } from "App/restore-device/reducers"
import { SynchronizationState } from "App/data-sync/reducers"
import { ErrorSyncModalTestIds } from "App/connecting/components/error-sync-modal/error-sync-modal-test-ids.enum"

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
  backupDeviceState: BackupDeviceDataState.Empty,
  backupLocation: "",
  backups: [],
  caseColour: undefined,
  diagnosticSentTimestamp: 0,
  networkLevel: "",
  phoneLockTime: 0,
  readBackupDeviceDataState: jest.fn(),
  readRestoreDeviceDataState: jest.fn(),
  restoreDeviceState: RestoreDeviceDataState.Empty,
  startBackupDevice: jest.fn(),
  startRestoreDevice: jest.fn(),
  deviceType: null,
  appLatestVersion: "",
  appUpdateAvailable: undefined,
  lowestSupportedOsVersion: undefined,
  lowestSupportedCenterVersion: undefined,
  settingsLoaded: false,
  deviceUnlocked: undefined,
  appAutostart: false,
  appCollectingData: undefined,
  appConversionFormat: ConversionFormat.FLAC,
  appConvert: Convert.ConvertAutomatically,
  appIncomingCalls: false,
  appIncomingMessages: false,
  appLowBattery: false,
  appNonStandardAudioFilesConversion: false,
  appOsUpdates: false,
  appTethering: false,
  appTray: false,
  batteryLevel: 0,
  changeSim: jest.fn(),
  disconnectDevice: jest.fn(),
  deviceConnected: true,
  language: "en-US",
  loadData: jest.fn(),
  networkName: "network name",
  osVersion: "release-1.0.0",
  pureNeverConnected: false,
  pureOsBackupLocation: "path/location/backup",
  pureOsDownloadLocation: "path/location/download",
  basicInfoDataState: DataState.Empty,
  serialNumber: undefined,
  initialDataLoaded: false,
  appVersion: undefined,
  setCollectingData: jest.fn(),
  simCards: [
    {
      active: true,
      network: "Y-Mobile",
      networkLevel: 0.2,
      number: 12345678,
      slot: 1,
    },
  ],
  toggleDeviceUpdating: jest.fn(),
  updatePhoneOsInfo: jest.fn(),
  updatingState: UpdatingState.Standby,
  memorySpace: {
    free: 100,
    full: 200,
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
