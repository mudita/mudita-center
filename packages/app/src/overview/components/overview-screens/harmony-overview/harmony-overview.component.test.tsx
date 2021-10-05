/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import store from "Renderer/store"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { HarmonyOverview } from "App/overview/components/overview-screens/harmony-overview/harmony-overview.component"
import {
  DataState,
  UpdatingState,
} from "Renderer/models/basic-info/basic-info.typings"
import {
  ConversionFormat,
  Convert,
} from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"
import { StatusTestIds } from "App/overview/components/status/status-test-ids.enum"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"
import { intl } from "Renderer/utils/intl"

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: jest.fn(),
      append: jest.fn(),
    }),
    MenuItem: () => jest.fn(),
  },
}))

const defaultProps: ComponentProps<typeof HarmonyOverview> = {
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
  },
}

const render = () => {
  return renderWithThemeAndIntl(
    <Provider store={store}>
      <HarmonyOverview {...defaultProps} />
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
