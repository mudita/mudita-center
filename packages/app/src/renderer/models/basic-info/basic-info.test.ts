/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { init } from "@rematch/core"
import basicInfo from "./basic-info"
import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import {
  SimCard,
  DataState,
} from "Renderer/models/basic-info/basic-info.typings"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import {
  commonCalls,
  makeErrorDeviceResponse,
  makeSuccessDeviceResponse,
} from "Renderer/models/basic-info/utils/test-helpers"

afterEach(() => {
  for (const property in (ipcRenderer as any).__rendererCalls) {
    if ((ipcRenderer as any).__rendererCalls.hasOwnProperty(property)) {
      delete (ipcRenderer as any).__rendererCalls[property]
    }
  }
})

test("store returns initial state", () => {
  const store = init({
    models: { basicInfo },
  })
  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "deviceConnected": false,
        "deviceUpdating": false,
        "initialDataLoaded": false,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": "",
        "simCards": Array [],
      },
    }
  `)
})

test("mock calls update state", async () => {
  const store = init({
    models: { basicInfo },
  })
  ;(ipcRenderer as any).__rendererCalls = {
    ...commonCalls,
  }

  await store.dispatch.basicInfo.loadBasicInfoData()

  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 1,
        "batteryLevel": 9001,
        "deviceConnected": false,
        "deviceUpdating": false,
        "initialDataLoaded": false,
        "lastBackup": Object {
          "createdAt": "20-11-15T07:35:01.562Z20",
          "size": 99999,
        },
        "memorySpace": Object {
          "free": 99999999999999,
          "full": 9001,
        },
        "networkName": "",
        "osUpdateDate": "12-12-2003",
        "osVersion": "0.123v",
        "simCards": Array [
          Object {
            "active": true,
            "network": "Y-Mobile",
            "networkLevel": 0.5,
            "number": 12345678,
            "slot": 1,
          },
          Object {
            "active": false,
            "network": "X-Mobile",
            "networkLevel": 0.69,
            "number": 7001234523,
            "slot": 2,
          },
        ],
      },
    }
  `)
})

test("disconnect returns true and updates state", async () => {
  const store = init({
    models: { basicInfo },
  })
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcRequest.DisconnectDevice]: Promise.resolve({
      status: DeviceResponseStatus.Ok,
    }),
  }

  await store.dispatch.basicInfo.disconnect()

  const state = store.getState()

  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "deviceConnected": false,
        "deviceUpdating": false,
        "initialDataLoaded": false,
        "memorySpace": Object {
          "free": 0,
          "full": 0,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": "",
        "simCards": Array [],
      },
    }
  `)
})

test("initial data is fetched after successful connection ", async () => {
  const store = init({
    models: { basicInfo },
  })
  ;(ipcRenderer as any).__rendererCalls = {
    ...commonCalls,
    [IpcRequest.ConnectDevice]: Promise.resolve({
      status: DeviceResponseStatus.Ok,
    }),
  }

  await store.dispatch.basicInfo.connect()

  const state = store.getState()
  expect(state.basicInfo.initialDataLoaded).toBe(true)
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 1,
        "batteryLevel": 9001,
        "deviceConnected": true,
        "deviceUpdating": false,
        "initialDataLoaded": true,
        "lastBackup": Object {
          "createdAt": "20-11-15T07:35:01.562Z20",
          "size": 99999,
        },
        "memorySpace": Object {
          "free": 99999999999999,
          "full": 9001,
        },
        "networkName": "",
        "osUpdateDate": "12-12-2003",
        "osVersion": "0.123v",
        "simCards": Array [
          Object {
            "active": true,
            "network": "Y-Mobile",
            "networkLevel": 0.5,
            "number": 12345678,
            "slot": 1,
          },
          Object {
            "active": false,
            "network": "X-Mobile",
            "networkLevel": 0.69,
            "number": 7001234523,
            "slot": 2,
          },
        ],
      },
    }
  `)
})

test("change sim switches active property on sim cards", async () => {
  const store = init({
    models: { basicInfo },
  })
  ;(ipcRenderer as any).__rendererCalls = {
    ...commonCalls,
    [IpcRequest.ChangeSim]: Promise.resolve({
      status: DeviceResponseStatus.Ok,
    }),
  }
  const simCard: SimCard = {
    network: "X-Mobile",
    networkLevel: 0.5,
    number: 7001234523,
    slot: 2,
    active: false,
  }

  await store.dispatch.basicInfo.loadBasicInfoData()
  await store.dispatch.basicInfo.changeSim(simCard)

  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 1,
        "batteryLevel": 9001,
        "deviceConnected": false,
        "deviceUpdating": false,
        "initialDataLoaded": false,
        "lastBackup": Object {
          "createdAt": "20-11-15T07:35:01.562Z20",
          "size": 99999,
        },
        "memorySpace": Object {
          "free": 99999999999999,
          "full": 9001,
        },
        "networkName": "",
        "osUpdateDate": "12-12-2003",
        "osVersion": "0.123v",
        "simCards": Array [
          Object {
            "active": false,
            "network": "Y-Mobile",
            "networkLevel": 0.5,
            "number": 12345678,
            "slot": 1,
          },
          Object {
            "active": true,
            "network": "X-Mobile",
            "networkLevel": 0.69,
            "number": 7001234523,
            "slot": 2,
          },
        ],
      },
    }
  `)
})

test("sets the error result when one of the requests fails", async () => {
  const store = init({
    models: { basicInfo },
  })
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcRequest.GetDeviceInfo]: makeSuccessDeviceResponse({
      name: "Ziemniaczek",
      modelName: "U12300000",
      modelNumber: "A1239999",
      serilaNumber: "a-b-3d",
      osVersion: "0.123v",
      osUpdateDate: "12-12-2003",
    }),
    [IpcRequest.GetNetworkInfo]: makeSuccessDeviceResponse({
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
    }),
    [IpcRequest.GetStorageInfo]: makeSuccessDeviceResponse({
      capacity: 9001,
      available: 99999999999999,
      categories: [
        { label: "music", filesCount: 1233333, size: 999999999 },
        { label: "storage", filesCount: 100000, size: 999999999 },
      ],
    }),
    [IpcRequest.GetBatteryInfo]: makeSuccessDeviceResponse({
      level: 9001,
      charging: false,
      maximumCapacity: 99999,
    }),
    [IpcRequest.GetBackupsInfo]: makeSuccessDeviceResponse({
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
    }),
    [IpcRequest.GetBatteryInfo]: makeErrorDeviceResponse(),
  }
  await store.dispatch.basicInfo.loadBasicInfoData()
  expect(store.getState().basicInfo.basicInfoDataState).toBe(DataState.Error)
})
