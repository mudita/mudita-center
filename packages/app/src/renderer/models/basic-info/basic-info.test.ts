/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { init } from "@rematch/core"
import basicInfo from "./basic-info"
import {
  SimCard,
  DataState,
} from "Renderer/models/basic-info/basic-info.typings"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import getDeviceInfo from "Renderer/requests/get-device-info.request"
import Mock = jest.Mock

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

jest.mock("Renderer/requests/disconnect-device.request", () =>
  jest.fn(() => ({
    status: DeviceResponseStatus.Ok,
  }))
)

jest.mock("Renderer/requests/connect-device.request", () =>
  jest.fn(() => ({
    status: DeviceResponseStatus.Ok,
  }))
)

jest.mock("Renderer/requests/change-sim.request", () =>
  jest.fn(() => ({
    status: DeviceResponseStatus.Ok,
  }))
)

const storeConfig = {
  models: { basicInfo },
  redux: {
    initialState: {},
  },
}

let store = init(storeConfig)

beforeEach(() => {
  store = init(storeConfig)
  jest.resetModules()
})

test("store returns initial state", () => {
  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "deviceConnected": false,
        "deviceConnecting": false,
        "deviceUnblocked": undefined,
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
  await store.dispatch.basicInfo.loadBasicInfoData()

  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 1,
        "batteryLevel": 9001,
        "deviceConnected": false,
        "deviceConnecting": false,
        "deviceUnblocked": undefined,
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
  await store.dispatch.basicInfo.disconnect()

  const state = store.getState()

  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 2,
        "batteryLevel": 0,
        "deviceConnected": false,
        "deviceConnecting": false,
        "deviceUnblocked": undefined,
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

test("initial data is fetched after device unblocked ", async () => {
  await store.dispatch.basicInfo.toggleDeviceUnblocked(true)

  const state = store.getState()
  expect(state.basicInfo.initialDataLoaded).toBe(true)
  expect(state).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 1,
        "batteryLevel": 9001,
        "deviceConnected": false,
        "deviceConnecting": false,
        "deviceUnblocked": true,
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
        "deviceConnecting": false,
        "deviceUnblocked": undefined,
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
  ;(getDeviceInfo as Mock).mockReturnValue({
    status: DeviceResponseStatus.Error,
  })
  await store.dispatch.basicInfo.loadBasicInfoData()
  expect(store.getState().basicInfo.basicInfoDataState).toBe(DataState.Error)
})
