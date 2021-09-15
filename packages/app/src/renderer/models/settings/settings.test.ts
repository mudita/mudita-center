/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { init } from "@rematch/core"
import { version } from "../../../../package.json"
import settings from "Renderer/models/settings/settings"
import {
  ConversionFormat,
  Convert,
} from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { fakeAppSettings } from "Backend/adapters/app-settings/app-settings-fake.adapter"
import { GetApplicationConfigurationEvents } from "App/main/functions/register-get-application-configuration-listener"
import getDeviceLogs from "Renderer/requests/get-device-logs.request"
import sendDiagnosticDataRequest from "Renderer/requests/send-diagnostic-data.request"
import { AxiosResponse } from "axios"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import Mock = jest.Mock
import basicInfo from "Renderer/models/basic-info/basic-info"

const getDeviceLogsResponse: DeviceResponse<string> = {
  status: DeviceResponseStatus.Ok,
  data: "logs",
}

const sendDiagnosticDataRequestResponse: AxiosResponse<unknown> = {
  config: {},
  data: undefined,
  headers: undefined,
  statusText: "",
  status: 200,
}

jest.mock("Renderer/requests/get-device-logs.request", () =>
  jest.fn(() => Promise.resolve(getDeviceLogsResponse))
)
jest.mock("Renderer/requests/send-diagnostic-data.request", () =>
  jest.fn(() => Promise.resolve(sendDiagnosticDataRequestResponse))
)

const today = new Date()
const todayTimestamp = today.getTime()
const yesterdayTimestamp = new Date(
  today.setDate(today.getDate() - 1)
).getTime()

const mockIpc = () => {
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcRequest.UpdateAppSettings]: Promise.resolve(),
    [IpcRequest.GetAppSettings]: Promise.resolve(fakeAppSettings),
    [GetApplicationConfigurationEvents.Request]: Promise.resolve({
      osVersion: "0.0.0",
      centerVersion: "0.0.0",
    }),
  }
}

const storeConfig = {
  models: { settings, basicInfo },
}

let store = init(storeConfig)

beforeEach(() => {
  store = init(storeConfig)
})

afterEach(() => {
  ;(getDeviceLogs as any).mockClear()
  ;(sendDiagnosticDataRequest as any).mockClear()
  // ;(getMessagesByThreadId as any).mockClear()
})

test("loads settings", async () => {
  mockIpc()
  await store.dispatch.settings.loadSettings()
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "caseColour": undefined,
        "deviceConnected": false,
        "deviceType": undefined,
        "deviceUnlocked": undefined,
        "initialDataLoaded": false,
        "lastBackup": undefined,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": undefined,
        "phoneLockTime": undefined,
        "serialNumber": undefined,
        "simCards": Array [],
        "updatingState": 0,
      },
      "settings": Object {
        "appAutostart": false,
        "appCollectingData": undefined,
        "appConversionFormat": "WAV",
        "appConvert": "Convert automatically",
        "appCurrentVersion": "${version}",
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
        "appUpdateStepModalDisplayed": false,
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
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "caseColour": undefined,
        "deviceConnected": false,
        "deviceType": undefined,
        "deviceUnlocked": undefined,
        "initialDataLoaded": false,
        "lastBackup": undefined,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": undefined,
        "phoneLockTime": undefined,
        "serialNumber": undefined,
        "simCards": Array [],
        "updatingState": 0,
      },
      "settings": Object {
        "appCurrentVersion": "${version}",
        "appLatestVersion": "",
        "appTethering": true,
        "appUpdateAvailable": undefined,
        "appUpdateRequired": false,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedCenterVersion": undefined,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates incoming calls setting", async () => {
  mockIpc()
  await store.dispatch.settings.setIncomingCalls(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "caseColour": undefined,
        "deviceConnected": false,
        "deviceType": undefined,
        "deviceUnlocked": undefined,
        "initialDataLoaded": false,
        "lastBackup": undefined,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": undefined,
        "phoneLockTime": undefined,
        "serialNumber": undefined,
        "simCards": Array [],
        "updatingState": 0,
      },
      "settings": Object {
        "appCurrentVersion": "${version}",
        "appIncomingCalls": true,
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateRequired": false,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedCenterVersion": undefined,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates incoming messages setting", async () => {
  mockIpc()
  await store.dispatch.settings.setIncomingMessages(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "caseColour": undefined,
        "deviceConnected": false,
        "deviceType": undefined,
        "deviceUnlocked": undefined,
        "initialDataLoaded": false,
        "lastBackup": undefined,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": undefined,
        "phoneLockTime": undefined,
        "serialNumber": undefined,
        "simCards": Array [],
        "updatingState": 0,
      },
      "settings": Object {
        "appCurrentVersion": "${version}",
        "appIncomingMessages": true,
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateRequired": false,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedCenterVersion": undefined,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates low battery setting", async () => {
  mockIpc()
  await store.dispatch.settings.setLowBattery(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "caseColour": undefined,
        "deviceConnected": false,
        "deviceType": undefined,
        "deviceUnlocked": undefined,
        "initialDataLoaded": false,
        "lastBackup": undefined,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": undefined,
        "phoneLockTime": undefined,
        "serialNumber": undefined,
        "simCards": Array [],
        "updatingState": 0,
      },
      "settings": Object {
        "appCurrentVersion": "${version}",
        "appLatestVersion": "",
        "appLowBattery": true,
        "appUpdateAvailable": undefined,
        "appUpdateRequired": false,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedCenterVersion": undefined,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates os updates setting", async () => {
  mockIpc()
  await store.dispatch.settings.setOsUpdates(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "caseColour": undefined,
        "deviceConnected": false,
        "deviceType": undefined,
        "deviceUnlocked": undefined,
        "initialDataLoaded": false,
        "lastBackup": undefined,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": undefined,
        "phoneLockTime": undefined,
        "serialNumber": undefined,
        "simCards": Array [],
        "updatingState": 0,
      },
      "settings": Object {
        "appCurrentVersion": "${version}",
        "appLatestVersion": "",
        "appOsUpdates": true,
        "appUpdateAvailable": undefined,
        "appUpdateRequired": false,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedCenterVersion": undefined,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates collecting data setting to true", async () => {
  mockIpc()
  await store.dispatch.settings.toggleAppCollectingData(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "caseColour": undefined,
        "deviceConnected": false,
        "deviceType": undefined,
        "deviceUnlocked": undefined,
        "initialDataLoaded": false,
        "lastBackup": undefined,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": undefined,
        "phoneLockTime": undefined,
        "serialNumber": undefined,
        "simCards": Array [],
        "updatingState": 0,
      },
      "settings": Object {
        "appCollectingData": true,
        "appCurrentVersion": "${version}",
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateRequired": false,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedCenterVersion": undefined,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates collecting data setting to false", async () => {
  mockIpc()
  await store.dispatch.settings.toggleAppCollectingData(false)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "caseColour": undefined,
        "deviceConnected": false,
        "deviceType": undefined,
        "deviceUnlocked": undefined,
        "initialDataLoaded": false,
        "lastBackup": undefined,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": undefined,
        "phoneLockTime": undefined,
        "serialNumber": undefined,
        "simCards": Array [],
        "updatingState": 0,
      },
      "settings": Object {
        "appCollectingData": false,
        "appCurrentVersion": "${version}",
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateRequired": false,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedCenterVersion": undefined,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates os audio files conversion setting", async () => {
  mockIpc()
  await store.dispatch.settings.setNonStandardAudioFilesConversion(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "caseColour": undefined,
        "deviceConnected": false,
        "deviceType": undefined,
        "deviceUnlocked": undefined,
        "initialDataLoaded": false,
        "lastBackup": undefined,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": undefined,
        "phoneLockTime": undefined,
        "serialNumber": undefined,
        "simCards": Array [],
        "updatingState": 0,
      },
      "settings": Object {
        "appCurrentVersion": "${version}",
        "appLatestVersion": "",
        "appNonStandardAudioFilesConversion": true,
        "appUpdateAvailable": undefined,
        "appUpdateRequired": false,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedCenterVersion": undefined,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates convert setting", async () => {
  mockIpc()
  await store.dispatch.settings.setConvert(Convert.ConvertAutomatically)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "caseColour": undefined,
        "deviceConnected": false,
        "deviceType": undefined,
        "deviceUnlocked": undefined,
        "initialDataLoaded": false,
        "lastBackup": undefined,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": undefined,
        "phoneLockTime": undefined,
        "serialNumber": undefined,
        "simCards": Array [],
        "updatingState": 0,
      },
      "settings": Object {
        "appConvert": "Convert automatically",
        "appCurrentVersion": "${version}",
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateRequired": false,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedCenterVersion": undefined,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates conversion format setting", async () => {
  mockIpc()
  await store.dispatch.settings.setConversionFormat(ConversionFormat.WAV)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "caseColour": undefined,
        "deviceConnected": false,
        "deviceType": undefined,
        "deviceUnlocked": undefined,
        "initialDataLoaded": false,
        "lastBackup": undefined,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": undefined,
        "phoneLockTime": undefined,
        "serialNumber": undefined,
        "simCards": Array [],
        "updatingState": 0,
      },
      "settings": Object {
        "appConversionFormat": "WAV",
        "appCurrentVersion": "${version}",
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateRequired": false,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedCenterVersion": undefined,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates tray setting", async () => {
  mockIpc()
  await store.dispatch.settings.setAppTray(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "caseColour": undefined,
        "deviceConnected": false,
        "deviceType": undefined,
        "deviceUnlocked": undefined,
        "initialDataLoaded": false,
        "lastBackup": undefined,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": undefined,
        "phoneLockTime": undefined,
        "serialNumber": undefined,
        "simCards": Array [],
        "updatingState": 0,
      },
      "settings": Object {
        "appCurrentVersion": "${version}",
        "appLatestVersion": "",
        "appTray": true,
        "appUpdateAvailable": undefined,
        "appUpdateRequired": false,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedCenterVersion": undefined,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates PureOS backup location setting", async () => {
  mockIpc()
  await store.dispatch.settings.setPureOsBackupLocation("some/fake/location")
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "caseColour": undefined,
        "deviceConnected": false,
        "deviceType": undefined,
        "deviceUnlocked": undefined,
        "initialDataLoaded": false,
        "lastBackup": undefined,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": undefined,
        "phoneLockTime": undefined,
        "serialNumber": undefined,
        "simCards": Array [],
        "updatingState": 0,
      },
      "settings": Object {
        "appCurrentVersion": "${version}",
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateRequired": false,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedCenterVersion": undefined,
        "lowestSupportedOsVersion": undefined,
        "pureOsBackupLocation": "some/fake/location",
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates PureOS download location setting", async () => {
  mockIpc()
  await store.dispatch.settings.setPureOsDownloadLocation("some/fake/location")
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "caseColour": undefined,
        "deviceConnected": false,
        "deviceType": undefined,
        "deviceUnlocked": undefined,
        "initialDataLoaded": false,
        "lastBackup": undefined,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": undefined,
        "phoneLockTime": undefined,
        "serialNumber": undefined,
        "simCards": Array [],
        "updatingState": 0,
      },
      "settings": Object {
        "appCurrentVersion": "${version}",
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateRequired": false,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedCenterVersion": undefined,
        "lowestSupportedOsVersion": undefined,
        "pureOsDownloadLocation": "some/fake/location",
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates language setting", async () => {
  mockIpc()
  await store.dispatch.settings.setLanguage("de-DE")
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "caseColour": undefined,
        "deviceConnected": false,
        "deviceType": undefined,
        "deviceUnlocked": undefined,
        "initialDataLoaded": false,
        "lastBackup": undefined,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": undefined,
        "phoneLockTime": undefined,
        "serialNumber": undefined,
        "simCards": Array [],
        "updatingState": 0,
      },
      "settings": Object {
        "appCurrentVersion": "${version}",
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateRequired": false,
        "appUpdateStepModalDisplayed": false,
        "language": "de-DE",
        "lowestSupportedCenterVersion": undefined,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("sendDiagnosticData effect no generate any side effects if serial number is undefined", async () => {
  mockIpc()
  await store.dispatch.settings.loadSettings()
  await store.dispatch.settings.sendDiagnosticData()

  expect(getDeviceLogs).not.toBeCalled()
  expect(sendDiagnosticDataRequest).not.toBeCalled()
})

test("sendDiagnosticData effect no generate any side effects if diagnostic data isn't set", async () => {
  mockIpc()
  await store.dispatch.basicInfo.update({ serialNumber: "000000000" })
  await store.dispatch.settings.loadSettings()
  await store.dispatch.settings.sendDiagnosticData()

  expect(getDeviceLogs).not.toBeCalled()
  expect(sendDiagnosticDataRequest).not.toBeCalled()
})

test("sendDiagnosticData effect no generate any side effects if diagnostic data is set to false", async () => {
  const setDiagnosticSentTimestamp = jest.spyOn(
    store.dispatch.settings,
    "setDiagnosticSentTimestamp"
  )

  ;(ipcRenderer as any).__rendererCalls = {
    [IpcRequest.GetAppSettings]: Promise.resolve({
      ...fakeAppSettings,
      appCollectingData: false,
    }),
    [GetApplicationConfigurationEvents.Request]: Promise.resolve({
      osVersion: "0.0.0",
      centerVersion: "0.0.0",
    }),
  }
  await store.dispatch.basicInfo.update({ serialNumber: "000000000" })
  await store.dispatch.settings.loadSettings()
  await store.dispatch.settings.sendDiagnosticData()

  expect(getDeviceLogs).not.toBeCalled()
  expect(sendDiagnosticDataRequest).not.toBeCalled()
  expect(setDiagnosticSentTimestamp).not.toBeCalled()
})

test("sendDiagnosticData effect no generate any side effects if diagnostic data is set to false & diagnosticSentTimestamp presents today", async () => {
  const setDiagnosticSentTimestamp = jest.spyOn(
    store.dispatch.settings,
    "setDiagnosticSentTimestamp"
  )
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcRequest.GetAppSettings]: Promise.resolve({
      ...fakeAppSettings,
      appCollectingData: true,
      diagnosticSentTimestamp: todayTimestamp,
    }),
    [GetApplicationConfigurationEvents.Request]: Promise.resolve({
      osVersion: "0.0.0",
      centerVersion: "0.0.0",
    }),
  }
  await store.dispatch.basicInfo.update({ serialNumber: "000000000" })
  await store.dispatch.settings.loadSettings()
  await store.dispatch.settings.sendDiagnosticData()

  expect(getDeviceLogs).not.toBeCalled()
  expect(sendDiagnosticDataRequest).not.toBeCalled()
  expect(setDiagnosticSentTimestamp).not.toBeCalled()
})

test("sendDiagnosticData pass successfully if user agree to collecting data and timestamp no presents today", async () => {
  const setDiagnosticSentTimestamp = jest.spyOn(
    store.dispatch.settings,
    "setDiagnosticSentTimestamp"
  )
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcRequest.GetAppSettings]: Promise.resolve({
      ...fakeAppSettings,
      appCollectingData: true,
      diagnosticSentTimestamp: yesterdayTimestamp,
    }),
    [GetApplicationConfigurationEvents.Request]: Promise.resolve({
      osVersion: "0.0.0",
      centerVersion: "0.0.0",
    }),
  }
  await store.dispatch.basicInfo.update({ serialNumber: "000000000" })
  await store.dispatch.settings.loadSettings()
  await store.dispatch.settings.sendDiagnosticData()

  expect(getDeviceLogs).toBeCalled()
  expect(sendDiagnosticDataRequest).toBeCalled()
  expect(setDiagnosticSentTimestamp).toBeCalled()
})

test("sendDiagnosticData effect no sent requests if getting device logs fails", async () => {
  const setDiagnosticSentTimestamp = jest.spyOn(
    store.dispatch.settings,
    "setDiagnosticSentTimestamp"
  )
  ;(getDeviceLogs as Mock).mockReturnValue({
    status: DeviceResponseStatus.Error,
  })
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcRequest.GetAppSettings]: Promise.resolve({
      ...fakeAppSettings,
      appCollectingData: true,
      diagnosticSentTimestamp: yesterdayTimestamp,
    }),
    [GetApplicationConfigurationEvents.Request]: Promise.resolve({
      osVersion: "0.0.0",
      centerVersion: "0.0.0",
    }),
  }
  await store.dispatch.basicInfo.update({ serialNumber: "000000000" })
  await store.dispatch.settings.loadSettings()
  await store.dispatch.settings.sendDiagnosticData()

  expect(getDeviceLogs).toBeCalled()
  expect(sendDiagnosticDataRequest).not.toBeCalled()
  expect(setDiagnosticSentTimestamp).not.toBeCalled()
})

test("sendDiagnosticData effect is fails if request no finish successfully", async () => {
  const setDiagnosticSentTimestamp = jest.spyOn(
    store.dispatch.settings,
    "setDiagnosticSentTimestamp"
  )
  ;(getDeviceLogs as Mock).mockReturnValue(getDeviceLogsResponse)
  ;(sendDiagnosticDataRequest as Mock).mockImplementation(() => {
    throw new Error()
  })
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcRequest.GetAppSettings]: Promise.resolve({
      ...fakeAppSettings,
      appCollectingData: true,
      diagnosticSentTimestamp: yesterdayTimestamp,
    }),
    [GetApplicationConfigurationEvents.Request]: Promise.resolve({
      osVersion: "0.0.0",
      centerVersion: "0.0.0",
    }),
  }
  await store.dispatch.basicInfo.update({ serialNumber: "000000000" })
  await store.dispatch.settings.loadSettings()
  await store.dispatch.settings.sendDiagnosticData()

  expect(getDeviceLogs).toBeCalled()
  expect(sendDiagnosticDataRequest).toBeCalled()
  expect(setDiagnosticSentTimestamp).not.toBeCalled()
})
