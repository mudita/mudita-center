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
import { DataState, UpdatingState } from "Renderer/models/basic-info/basic-info.typings"
import { ConversionFormat, Convert } from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"
import { StatusTestIds } from "App/overview/components/status/status-test-ids.enum"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"
import { intl } from "Renderer/utils/intl"
import { BackupDeviceDataState } from "App/backup-device/reducers"
import { noop } from "Renderer/utils/noop"
import { RestoreDeviceDataState } from "App/restore-device/reducers"

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: jest.fn(),
      append: jest.fn(),
    }),
    MenuItem: () => jest.fn(),
  },
}))

const defaultProps: ComponentProps<typeof PureOverview> = {
  backupDeviceState: BackupDeviceDataState.Empty,
  backupLocation: "",
  backups: [],
  caseColour: undefined,
  diagnosticSentTimestamp: 0,
  networkLevel: "",
  phoneLockTime: 0,
  readBackupDeviceDataState: noop,
  readRestoreDeviceDataState: noop,
  restoreDeviceState: RestoreDeviceDataState.Empty,
  startBackupDevice: noop,
  startRestoreDevice: noop,
  deviceType: null,
  appLatestVersion: "",
  appUpdateAvailable: undefined,
  appUpdateStepModalDisplayed: false,
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
  appUpdateStepModalShow: false,
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
  osUpdateDate: "2020-01-14T11:31:08.244Z",
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
  }
}

const render = () => {
  return renderWithThemeAndIntl(
    <Router history={history}>
      <Provider store={store}>
        <PureOverview {...defaultProps} />
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
