/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { init, InitConfig } from "@rematch/core"
import settings from "Renderer/models/settings/settings"
import {
  AppSettings,
  ConversionFormat,
  Convert,
} from "App/main/store/settings.interface"
import { GetApplicationConfigurationEvents } from "App/main/functions/register-get-application-configuration-listener"
import getDeviceLogFiles from "Renderer/requests/get-device-log-files.request"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import Mock = jest.Mock
import { deviceReducer } from "App/device"
import { DeviceFile } from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import { ArchiveFilesEvents } from "App/main/functions/register-archive-files-listener"
import { IpcAppSettingsRequest } from "App/app-settings/constants"

export const fakeAppSettings: AppSettings = {
  applicationId: "app-Nr8uiSV7KmWxX3WOFqZPF7uB",
  appAutostart: false,
  appTethering: false,
  appIncomingCalls: false,
  appIncomingMessages: false,
  appLowBattery: false,
  appOsUpdates: false,
  appNonStandardAudioFilesConversion: false,
  appConvert: Convert.ConvertAutomatically,
  appConversionFormat: ConversionFormat.WAV,
  appTray: true,
  pureOsBackupLocation: `fake/path/pure/phone/backups/`,
  pureOsDownloadLocation: `fake/path/pure/os/downloads/`,
  language: "en-US",
  pureNeverConnected: true,
  appCollectingData: undefined,
  diagnosticSentTimestamp: 0,
}

const getDeviceFileResponse: DeviceResponse<DeviceFile[]> = {
  status: DeviceResponseStatus.Ok,
  data: [
    {
      data: Buffer.from("logs"),
      name: "logs.log",
    },
  ],
}
jest.mock("Renderer/requests/get-device-log-files.request", () =>
  jest.fn(() => Promise.resolve(getDeviceFileResponse))
)
jest.mock("Renderer/requests/get-device-crash-dump-files.request", () =>
  jest.fn(() => Promise.resolve(getDeviceFileResponse))
)
const uploadFileRequest = jest.fn()

const today = new Date()
const todayTimestamp = today.getTime()
const yesterdayTimestamp = new Date(
  today.setDate(today.getDate() - 1)
).getTime()

const mockIpc = () => {
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcAppSettingsRequest.Update]: Promise.resolve(),
    [IpcAppSettingsRequest.Get]: Promise.resolve(fakeAppSettings),
    [GetApplicationConfigurationEvents.Request]: Promise.resolve({
      osVersion: "0.0.0",
      centerVersion: "0.0.0",
    }),
  }
}

const storeConfig: InitConfig = {
  models: { settings },
  redux: {
    reducers: {
      device: deviceReducer,
    },
    initialState: {
      device: {
        data: {
          serialNumber: "000000000",
        },
      },
    },
  },
}

let store = init(storeConfig)

beforeEach(() => {
  store = init(storeConfig)
})

afterEach(() => {
  ;(getDeviceLogFiles as any).mockClear()
  ;(uploadFileRequest as any).mockClear()
  // ;(getMessagesByThreadId as any).mockClear()
})

test("loads settings", async () => {
  mockIpc()
  await store.dispatch.settings.loadSettings()
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "device": Object {
        "data": Object {
          "serialNumber": "000000000",
        },
      },
      "settings": Object {
        "appAutostart": false,
        "appCollectingData": undefined,
        "appConversionFormat": "WAV",
        "appConvert": "Convert automatically",
        "appCurrentVersion": "1.2.0-rc.4",
        "appIncomingCalls": false,
        "appIncomingMessages": false,
        "appLatestVersion": "",
        "appLowBattery": false,
        "appNonStandardAudioFilesConversion": false,
        "appOsUpdates": false,
        "appTethering": false,
        "appTray": true,
        "appUpdateAvailable": undefined,
        "appUpdateRequired": false,
        "applicationId": "app-Nr8uiSV7KmWxX3WOFqZPF7uB",
        "diagnosticSentTimestamp": 0,
        "language": "en-US",
        "lowestSupportedCenterVersion": undefined,
        "lowestSupportedOsVersion": "0.0.0",
        "pureNeverConnected": true,
        "pureOsBackupLocation": "fake/path/pure/phone/backups/",
        "pureOsDownloadLocation": "fake/path/pure/os/downloads/",
        "settingsLoaded": true,
      },
    }
  `)
})

test("updates tethering setting", async () => {
  mockIpc()
  await store.dispatch.settings.setTethering(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "device": Object {
        "data": Object {
          "serialNumber": "000000000",
        },
      },
      "settings": Object {
        "appCurrentVersion": "`)
})

test("updates incoming calls setting", async () => {
  mockIpc()
  await store.dispatch.settings.setIncomingCalls(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "device": Object {
        "data": Object {
          "serialNumber": "000000000",
        },
      },
      "settings": Object {
        "appCurrentVersion": "`)
})

test("updates incoming messages setting", async () => {
  mockIpc()
  await store.dispatch.settings.setIncomingMessages(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "device": Object {
        "data": Object {
          "serialNumber": "000000000",
        },
      },
      "settings": Object {
        "appCurrentVersion": "`)
})

test("updates low battery setting", async () => {
  mockIpc()
  await store.dispatch.settings.setLowBattery(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "device": Object {
        "data": Object {
          "serialNumber": "000000000",
        },
      },
      "settings": Object {
        "appCurrentVersion": "`)
})

test("updates os updates setting", async () => {
  mockIpc()
  await store.dispatch.settings.setOsUpdates(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "device": Object {
        "data": Object {
          "serialNumber": "000000000",
        },
      },
      "settings": Object {
        "appCurrentVersion": "`)
})

test("updates collecting data setting to true", async () => {
  mockIpc()
  await store.dispatch.settings.toggleAppCollectingData(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "device": Object {
        "data": Object {
          "serialNumber": "000000000",
        },
      },
      "settings": Object {
        "appCollectingData": true,
        "appCurrentVersion": "`)
})

test("updates collecting data setting to false", async () => {
  mockIpc()
  await store.dispatch.settings.toggleAppCollectingData(false)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "device": Object {
        "data": Object {
          "serialNumber": "000000000",
        },
      },
      "settings": Object {
        "appCollectingData": false,
        "appCurrentVersion": "`)
})

test("updates os audio files conversion setting", async () => {
  mockIpc()
  await store.dispatch.settings.setNonStandardAudioFilesConversion(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "device": Object {
        "data": Object {
          "serialNumber": "000000000",
        },
      },
      "settings": Object {
        "appCurrentVersion": "`)
})

test("updates convert setting", async () => {
  mockIpc()
  await store.dispatch.settings.setConvert(Convert.ConvertAutomatically)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "device": Object {
        "data": Object {
          "serialNumber": "000000000",
        },
      },
      "settings": Object {
        "appConvert": "Convert automatically",
        "appCurrentVersion": "`)
})

test("updates conversion format setting", async () => {
  mockIpc()
  await store.dispatch.settings.setConversionFormat(ConversionFormat.WAV)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "device": Object {
        "data": Object {
          "serialNumber": "000000000",
        },
      },
      "settings": Object {
        "appConversionFormat": "WAV",
        "appCurrentVersion": "`)
})

test("updates tray setting", async () => {
  mockIpc()
  await store.dispatch.settings.setAppTray(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "device": Object {
        "data": Object {
          "serialNumber": "000000000",
        },
      },
      "settings": Object {
        "appCurrentVersion": "`)
})

test("updates PureOS backup location setting", async () => {
  mockIpc()
  await store.dispatch.settings.setPureOsBackupLocation("some/fake/location")
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "device": Object {
        "data": Object {
          "serialNumber": "000000000",
        },
      },
      "settings": Object {
        "appCurrentVersion": "`)
})

test("updates PureOS download location setting", async () => {
  mockIpc()
  await store.dispatch.settings.setPureOsDownloadLocation("some/fake/location")
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "device": Object {
        "data": Object {
          "serialNumber": "000000000",
        },
      },
      "settings": Object {
        "appCurrentVersion": "`)
})

test("updates language setting", async () => {
  mockIpc()
  await store.dispatch.settings.setLanguage("de-DE")
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "device": Object {
        "data": Object {
          "serialNumber": "000000000",
        },
      },
      "settings": Object {
        "appCurrentVersion": "`)
})

test.skip("sendDiagnosticData effect no generate any side effects if serial number is undefined", async () => {
  mockIpc()
  await store.dispatch.settings.loadSettings()
  await store.dispatch.settings.sendDiagnosticData()

  expect(getDeviceLogFiles).not.toBeCalled()
  expect(uploadFileRequest).not.toBeCalled()
})

test.skip("sendDiagnosticData effect no generate any side effects if diagnostic data isn't set", async () => {
  mockIpc()
  await store.dispatch.settings.loadSettings()
  await store.dispatch.settings.sendDiagnosticData()

  expect(getDeviceLogFiles).not.toBeCalled()
  expect(uploadFileRequest).not.toBeCalled()
})

test.skip("sendDiagnosticData effect no generate any side effects if diagnostic data is set to false", async () => {
  const setDiagnosticSentTimestamp = jest.spyOn(
    store.dispatch.settings,
    "setDiagnosticSentTimestamp"
  )

  ;(ipcRenderer as any).__rendererCalls = {
    [IpcAppSettingsRequest.Get]: Promise.resolve({
      ...fakeAppSettings,
      appCollectingData: false,
    }),
    [GetApplicationConfigurationEvents.Request]: Promise.resolve({
      osVersion: "0.0.0",
      centerVersion: "0.0.0",
    }),
  }

  await store.dispatch.settings.loadSettings()
  await store.dispatch.settings.sendDiagnosticData()

  expect(getDeviceLogFiles).not.toBeCalled()
  expect(uploadFileRequest).not.toBeCalled()
  expect(setDiagnosticSentTimestamp).not.toBeCalled()
})

test.skip("sendDiagnosticData effect no generate any side effects if diagnostic data is set to false & diagnosticSentTimestamp presents today", async () => {
  const setDiagnosticSentTimestamp = jest.spyOn(
    store.dispatch.settings,
    "setDiagnosticSentTimestamp"
  )
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcAppSettingsRequest.Get]: Promise.resolve({
      ...fakeAppSettings,
      appCollectingData: true,
      diagnosticSentTimestamp: todayTimestamp,
    }),
    [GetApplicationConfigurationEvents.Request]: Promise.resolve({
      osVersion: "0.0.0",
      centerVersion: "0.0.0",
    }),
  }

  await store.dispatch.settings.loadSettings()
  await store.dispatch.settings.sendDiagnosticData()

  expect(getDeviceLogFiles).not.toBeCalled()
  expect(uploadFileRequest).not.toBeCalled()
  expect(setDiagnosticSentTimestamp).not.toBeCalled()
})

test.skip("sendDiagnosticData pass successfully if user agree to collecting data and timestamp no presents today", async () => {
  const setDiagnosticSentTimestamp = jest.spyOn(
    store.dispatch.settings,
    "setDiagnosticSentTimestamp"
  )
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcAppSettingsRequest.Get]: Promise.resolve({
      ...fakeAppSettings,
      appCollectingData: true,
      diagnosticSentTimestamp: yesterdayTimestamp,
    }),
    [GetApplicationConfigurationEvents.Request]: Promise.resolve({
      osVersion: "0.0.0",
      centerVersion: "0.0.0",
    }),
    [ArchiveFilesEvents.Archive]: Promise.resolve(new Buffer("")),
  }

  await store.dispatch.settings.loadSettings()
  await store.dispatch.settings.sendDiagnosticData()

  expect(getDeviceLogFiles).toBeCalled()
  expect(uploadFileRequest).toBeCalled()
  expect(setDiagnosticSentTimestamp).toBeCalled()
})

test.skip("sendDiagnosticData effect no sent requests if getting device logs fails", async () => {
  const setDiagnosticSentTimestamp = jest.spyOn(
    store.dispatch.settings,
    "setDiagnosticSentTimestamp"
  )
  ;(getDeviceLogFiles as Mock).mockReturnValue({
    status: DeviceResponseStatus.Error,
  })
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcAppSettingsRequest.Get]: Promise.resolve({
      ...fakeAppSettings,
      appCollectingData: true,
      diagnosticSentTimestamp: yesterdayTimestamp,
    }),
    [GetApplicationConfigurationEvents.Request]: Promise.resolve({
      osVersion: "0.0.0",
      centerVersion: "0.0.0",
    }),
  }

  await store.dispatch.settings.loadSettings()
  await store.dispatch.settings.sendDiagnosticData()

  expect(getDeviceLogFiles).toBeCalled()
  expect(uploadFileRequest).not.toBeCalled()
  expect(setDiagnosticSentTimestamp).not.toBeCalled()
})

test.skip("sendDiagnosticData effect is fails if request no finish successfully", async () => {
  const setDiagnosticSentTimestamp = jest.spyOn(
    store.dispatch.settings,
    "setDiagnosticSentTimestamp"
  )
  ;(getDeviceLogFiles as Mock).mockReturnValue(getDeviceFileResponse)
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcAppSettingsRequest.Get]: Promise.resolve({
      ...fakeAppSettings,
      appCollectingData: true,
      diagnosticSentTimestamp: yesterdayTimestamp,
    }),
    [GetApplicationConfigurationEvents.Request]: Promise.resolve({
      osVersion: "0.0.0",
      centerVersion: "0.0.0",
    }),
    [ArchiveFilesEvents.Archive]: Promise.resolve(new Buffer("")),
  }

  await store.dispatch.settings.loadSettings()
  await store.dispatch.settings.sendDiagnosticData()

  expect(getDeviceLogFiles).toBeCalled()
  expect(uploadFileRequest).toBeCalled()
  expect(setDiagnosticSentTimestamp).not.toBeCalled()
})
