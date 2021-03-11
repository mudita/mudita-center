/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import Overview, {
  UpdateBasicInfo,
} from "Renderer/modules/overview/overview.component"
import {
  ResultsState,
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
import { ipcRenderer } from "electron-better-ipc"
import { commonCalls } from "Renderer/models/basic-info/utils/test-helpers"

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: jest.fn(),
      append: jest.fn(),
    }),
    MenuItem: () => jest.fn(),
  },
}))

jest.mock(
  "electron-better-ipc",
  () => {
    const mockIpcRenderer = {
      on: jest.fn(),
      removeListener: jest.fn(),
    }
    return { ipcRenderer: mockIpcRenderer }
  },
  { virtual: true }
)

const renderer = (extraProps?: {}) => {
  const defaultProps: BasicInfoInitialState &
    PhoneUpdateStore &
    UpdateBasicInfo &
    AppSettings &
    DevMode = {
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
    disconnectedDevice: false,
    language: "en-US",
    loadData: jest.fn(),
    networkName: "network name",
    osUpdateDate: "2020-01-14T11:31:08.244Z",
    osVersion: "1.0.0",
    pureNeverConnected: false,
    pureOsBackupLocation: "path/location/backup",
    pureOsDownloadLocation: "path/location/download",
    resultsState: ResultsState.Empty,
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
    toggleUpdatingDevice: jest.fn(),
    updatePhoneOsInfo: jest.fn(),
    updatingDevice: false,
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
  ;(ipcRenderer as any).__rendererCalls = {
    ...commonCalls,
  }
  const loadData = jest.fn()
  renderer({ loadData })
  expect(loadData).toBeCalledTimes(1)
})
