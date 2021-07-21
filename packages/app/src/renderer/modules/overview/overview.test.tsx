/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import Overview, {
  UpdateBasicInfo,
} from "Renderer/modules/overview/overview.component"
import {
  DataState,
  Store as BasicInfoInitialState,
} from "Renderer/models/basic-info/basic-info.typings"
import { PhoneUpdateStore } from "Renderer/models/phone-update/phone-update.interface"
import { AppSettings } from "App/main/store/settings.interface"
import { DevMode } from "App/dev-mode/store/dev-mode.interface"
import {
  ConversionFormat,
  Convert,
} from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"
import { Provider } from "react-redux"
import store from "Renderer/store"
import { Router } from "react-router"
import history from "Renderer/routes/history"
import { OverviewTestIds } from "Renderer/modules/overview/overview-test-ids.enum"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: jest.fn(),
      append: jest.fn(),
    }),
    MenuItem: () => jest.fn(),
  },
}))

jest.mock("Renderer/requests/get-device-info.request", () =>
  jest.fn(() => ({
    status: DeviceResponseStatus.Ok,
    data: {
      name: "Ziemniaczek",
      modelName: "U12300000",
      modelNumber: "A1239999",
      serilaNumber: "a-b-3d",
      osVersion: "0.123v",
      osUpdateDate: "12-12-2003",
    },
  }))
)

jest.mock("Renderer/requests/get-network-info.request", () =>
  jest.fn(() => ({
    status: DeviceResponseStatus.Ok,
    data: {
      simCards: [
        {
          active: true,
          network: "Y-Mobile",
          networkLevel: 0.5,
          number: 12345678,
          slot: 1,
        },
        {
          active: false,
          network: "X-Mobile",
          networkLevel: 0.69,
          number: 7001234523,
          slot: 2,
        },
      ],
    },
  }))
)

jest.mock("Renderer/requests/get-storage-info.request", () =>
  jest.fn(() => ({
    status: DeviceResponseStatus.Ok,
    data: {
      capacity: 9001,
      available: 99999999999999,
      categories: [
        { label: "music", filesCount: 1233333, size: 999999999 },
        { label: "storage", filesCount: 100000, size: 999999999 },
      ],
    },
  }))
)

jest.mock("Renderer/requests/get-battery-info.request", () =>
  jest.fn(() => ({
    status: DeviceResponseStatus.Ok,
    data: {
      level: 9001,
      charging: false,
      maximumCapacity: 99999,
    },
  }))
)

jest.mock("Renderer/requests/get-backups-info.request", () =>
  jest.fn(() => ({
    status: DeviceResponseStatus.Ok,
    data: {
      backups: [
        {
          createdAt: "20-11-15T07:35:01.562Z20",
          size: 99999,
        },
        {
          createdAt: "20-01-30T07:35:01.562Z20",
          size: 1234567,
        },
      ],
    },
  }))
)

const renderer = (extraProps?: {}) => {
  const defaultProps: BasicInfoInitialState &
    PhoneUpdateStore &
    UpdateBasicInfo &
    AppSettings &
    DevMode = {
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
    osUpdateDate: "2020-01-14T11:31:08.244Z",
    osVersion: "release-1.0.0",
    pureNeverConnected: false,
    pureOsBackupLocation: "path/location/backup",
    pureOsDownloadLocation: "path/location/download",
    basicInfoDataState: DataState.Empty,
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
    deviceUpdating: false,
    memorySpace: {
      free: 100,
      full: 200,
    },
    ...extraProps,
  }
  return renderWithThemeAndIntl(
    <Router history={history}>
      <Provider store={store}>
        <Overview {...defaultProps} />
      </Provider>
    </Router>
  )
}

test("loadData is fired when component is mounted", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(OverviewTestIds.BatteryLevel)).toHaveTextContent("0 %")
  expect(getByTestId(OverviewTestIds.NetworkName)).toHaveTextContent(
    "network name"
  )
  expect(getByTestId(OverviewTestIds.OsVersion)).toHaveTextContent("1.0.0")
})
