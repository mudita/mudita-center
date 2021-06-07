/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { init } from "@rematch/core"
import selectPlugin from "@rematch/select"
import { DataState } from "Renderer/models/basic-info/basic-info.typings"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import basicInfo, { initialState } from "./basic-info"

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
  plugins: [selectPlugin()],
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
        "deviceUnlocked": undefined,
        "deviceUpdating": false,
        "initialDataLoaded": false,
        "lastBackup": undefined,
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

describe("connect to the already attached device", () => {
  test("successful connect request changed state properly", async () => {
    await store.dispatch.basicInfo.connect()
    expect(store.getState().basicInfo.deviceConnected).toBe(true)
  })

  test("successful connect request doesn't have impact on rest properties", async () => {
    const {
      deviceConnected: prevDeviceConnected,
      ...prevRest
    } = store.getState().basicInfo
    await store.dispatch.basicInfo.connect()

    const { deviceConnected, ...rest } = store.getState().basicInfo
    expect(deviceConnected).toBe(true)
    expect(rest).toStrictEqual(prevRest)
  })
})

describe("disconnect connected device", () => {
  test("successful disconnect request changed state properly", async () => {
    await store.dispatch.basicInfo.connect()
    expect(store.getState().basicInfo.deviceConnected).toBe(true)

    await store.dispatch.basicInfo.disconnect()
    expect(store.getState().basicInfo.deviceConnected).toBe(false)
  })

  test("disconnect request set initial state properly", async () => {
    await store.dispatch.basicInfo.update({
      deviceConnected: true,
      deviceUpdating: false,
      deviceUnlocked: true,
      initialDataLoaded: true,
      basicInfoDataState: DataState.Loaded,
      batteryLevel: 9001,
      osVersion: "0.123v",
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
      memorySpace: { full: 9001, free: 99999999999999 },
      lastBackup: { createdAt: "20-11-15T07:35:01.562Z20", size: 99999 },
      osUpdateDate: "12-12-2003",
    })

    await store.dispatch.basicInfo.disconnect()
    const state = store.getState().basicInfo
    expect(state.deviceConnected).toBe(false)
    expect(state).toStrictEqual(initialState)
  })
})

describe("fetching basic info data", () => {
  test("successful fetch request changed basicInfoDataState flag properly", async () => {
    await store.dispatch.basicInfo.loadBasicInfoData()
    expect(store.getState().basicInfo.basicInfoDataState).toBe(DataState.Loaded)
  })
  test("successful fetch request transform responses properly ", async () => {
    await store.dispatch.basicInfo.loadBasicInfoData()
    expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "basicInfoDataState": 1,
        "batteryLevel": 9001,
        "deviceConnected": false,
        "deviceUnlocked": undefined,
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
})

describe("fetching initial data", () => {
  test("successful fetch request changed loaded flags properly", async () => {
    await store.dispatch.basicInfo.loadInitialData()
    expect(store.getState().basicInfo.initialDataLoaded).toBe(true)
    expect(store.getState().basicInfo.basicInfoDataState).toBe(DataState.Loaded)
  })
})

describe("connected event", () => {
  test("connected event set deviceConnected properly", async () => {
    await store.dispatch.basicInfo.toggleDeviceConnected(true)
    expect(store.getState().basicInfo.deviceConnected).toBe(true)
  })

  test("connected event  doesn't have impact on rest properties", async () => {
    const {
      deviceConnected: prevDeviceConnected,
      ...prevRest
    } = store.getState().basicInfo
    await store.dispatch.basicInfo.toggleDeviceConnected(true)

    const { deviceConnected, ...rest } = store.getState().basicInfo
    expect(deviceConnected).toBe(true)
    expect(rest).toStrictEqual(prevRest)
  })
})

describe("connected event", () => {
  test("successful disconnect request changed state properly", async () => {
    await store.dispatch.basicInfo.connect()
    expect(store.getState().basicInfo.deviceConnected).toBe(true)

    await store.dispatch.basicInfo.toggleDeviceConnected(false)
    expect(store.getState().basicInfo.deviceConnected).toBe(false)
  })

  test("disconnect request set initial state properly", async () => {
    await store.dispatch.basicInfo.update({
      deviceConnected: true,
      deviceUpdating: false,
      deviceUnlocked: true,
      initialDataLoaded: true,
      basicInfoDataState: DataState.Loaded,
      batteryLevel: 9001,
      osVersion: "0.123v",
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
      memorySpace: { full: 9001, free: 99999999999999 },
      lastBackup: { createdAt: "20-11-15T07:35:01.562Z20", size: 99999 },
      osUpdateDate: "12-12-2003",
    })

    await store.dispatch.basicInfo.toggleDeviceConnected(false)
    const state = store.getState().basicInfo
    expect(state.deviceConnected).toBe(false)
    expect(state).toStrictEqual(initialState)
  })
})

describe("unlocked event", () => {
  test("deviceUnlocked state is undefined as default", async () => {
    expect(store.getState().basicInfo.deviceUnlocked).toBe(undefined)
  })

  test("unlocked event trigger fetching initial data", async () => {
    await store.dispatch.basicInfo.toggleDeviceConnected(true)
    expect(store.getState().basicInfo.deviceConnected).toBe(true)
    expect(store.getState().basicInfo.deviceUnlocked).toBe(undefined)
    expect(store.getState().basicInfo.initialDataLoaded).toBe(false)

    await store.dispatch.basicInfo.toggleDeviceUnlocked(true)
    expect(store.getState().basicInfo.deviceUnlocked).toBe(true)
    expect(store.getState().basicInfo.initialDataLoaded).toBe(true)
  })
})

describe("locked event", () => {
  test("locked event set deviceUnlocked properly", async () => {
    await store.dispatch.basicInfo.toggleDeviceConnected(true)
    expect(store.getState().basicInfo.deviceConnected).toBe(true)
    expect(store.getState().basicInfo.deviceUnlocked).toBe(undefined)
    expect(store.getState().basicInfo.initialDataLoaded).toBe(false)

    await store.dispatch.basicInfo.toggleDeviceUnlocked(false)
    expect(store.getState().basicInfo.deviceUnlocked).toBe(false)
  })

  test("locked event doesn't have impact on rest properties", async () => {
    const {
      deviceUnlocked: prevDeviceUnlocked,
      ...prevRest
    } = store.getState().basicInfo
    await store.dispatch.basicInfo.toggleDeviceUnlocked(false)

    const { deviceUnlocked, ...rest } = store.getState().basicInfo
    expect(deviceUnlocked).toBe(false)
    expect(rest).toStrictEqual(prevRest)
  })
})

describe("deviceConnecting selector", () => {
  test("deviceConnecting as default is false", async () => {
    const deviceConnecting = store.select.basicInfo.deviceConnecting(
      store.getState()
    )
    expect(deviceConnecting).toBe(false)
  })

  test("deviceConnecting return true after connected event ", async () => {
    await store.dispatch.basicInfo.toggleDeviceConnected(true)
    const deviceConnecting = store.select.basicInfo.deviceConnecting(
      store.getState()
    )
    expect(deviceConnecting).toBe(true)
  })

  test("deviceConnecting return false when device is unlocked and init data is loaded", async () => {
    await store.dispatch.basicInfo.toggleDeviceConnected(true)
    await store.dispatch.basicInfo.toggleDeviceUnlocked(true)
    const deviceConnecting = store.select.basicInfo.deviceConnecting(
      store.getState()
    )
    expect(deviceConnecting).toBe(false)
  })

  test("deviceConnecting return true for each locked phone", async () => {
    let deviceConnecting: boolean
    await store.dispatch.basicInfo.toggleDeviceConnected(true)
    await store.dispatch.basicInfo.toggleDeviceUnlocked(true)
    deviceConnecting = store.select.basicInfo.deviceConnecting(store.getState())
    expect(deviceConnecting).toBe(false)

    await store.dispatch.basicInfo.toggleDeviceUnlocked(false)
    deviceConnecting = store.select.basicInfo.deviceConnecting(store.getState())
    expect(deviceConnecting).toBe(true)

    await store.dispatch.basicInfo.toggleDeviceConnected(false)
    await store.dispatch.basicInfo.toggleDeviceConnected(true)
    deviceConnecting = store.select.basicInfo.deviceConnecting(store.getState())
    expect(deviceConnecting).toBe(true)
  })
})

describe("pureFeaturesVisible selector", () => {
  test("pureFeaturesVisible as default is false", async () => {
    const pureFeaturesVisible = store.select.basicInfo.pureFeaturesVisible(
      store.getState()
    )
    expect(pureFeaturesVisible).toBe(false)
  })

  test("pureFeaturesVisible return true in updating process", async () => {
    await store.dispatch.basicInfo.toggleDeviceUpdating(true)
    const pureFeaturesVisible = store.select.basicInfo.pureFeaturesVisible(
      store.getState()
    )
    expect(pureFeaturesVisible).toBe(true)
  })

  test("pureFeaturesVisible return true if device is unlocked and init data is loaded", async () => {
    await store.dispatch.basicInfo.toggleDeviceUpdating(true)
    const pureFeaturesVisible = store.select.basicInfo.pureFeaturesVisible(
      store.getState()
    )
    expect(pureFeaturesVisible).toBe(true)
  })
})
