import { init } from "@rematch/core"
import basicInfo from "./basic-info"
import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { SimCard } from "Renderer/models/basic-info/interfaces"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"

test("store returns initial state", () => {
  const store = init({
    models: { basicInfo },
  })

  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "batteryLevel": 0,
        "disconnectedDevice": false,
        "lastBackup": "10.11.2019",
        "memorySpace": Object {
          "free": 0,
          "full": 16000000000,
        },
        "networkName": "",
        "osUpdateDate": "",
        "osVersion": "1.0",
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
    [IpcRequest.GetDeviceInfo]: Promise.resolve({
      name: "Ziemniaczek",
      modelName: "U12300000",
      modelNumber: "A1239999",
      serilaNumber: "a-b-3d",
      osVersion: "0.123v",
      osUpdateDate: "12-12-2003",
    }),
    [IpcRequest.GetNetworkInfo]: Promise.resolve({
      simCards: [
        {
          active: true,
          carrier: "AAAAAAAAAAAA",
          iccid: 1234,
          imei: 5678,
          meid: 8765,
          network: "Y-Mobile",
          networkLevel: 0.5,
          number: 12345678,
          seid: "1234",
          slot: 1,
        },
        {
          active: false,
          carrier: "BBBBBBBBBBBB",
          iccid: 412,
          imei: 42,
          meid: 1410,
          network: "X-Mobile",
          networkLevel: 0.69,
          number: 7001234523,
          seid: "x123",
          slot: 2,
        },
      ],
    }),
    [IpcRequest.GetStorageInfo]: Promise.resolve({
      capacity: 9001,
      available: 99999999999999,
      categories: [
        { label: "music", filesCount: 1233333, size: 999999999 },
        { label: "storage", filesCount: 100000, size: 999999999 },
      ],
    }),
    [IpcRequest.GetBatteryInfo]: Promise.resolve({
      level: 9001,
      charging: false,
      maximumCapacity: 99999,
    }),
    [IpcRequest.GetBackupsInfo]: Promise.resolve({
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
  }

  await store.dispatch.basicInfo.loadData()

  expect(store.getState()).toMatchInlineSnapshot(`
Object {
  "basicInfo": Object {
    "batteryLevel": 9001,
    "disconnectedDevice": false,
    "lastBackup": "20-01-30T07:35:01.562Z20",
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
        "carrier": "AAAAAAAAAAAA",
        "iccid": 1234,
        "imei": 5678,
        "meid": 8765,
        "network": "Y-Mobile",
        "networkLevel": 0.5,
        "number": 12345678,
        "seid": "1234",
        "slot": 1,
      },
      Object {
        "active": false,
        "carrier": "BBBBBBBBBBBB",
        "iccid": 412,
        "imei": 42,
        "meid": 1410,
        "network": "X-Mobile",
        "networkLevel": 0.69,
        "number": 7001234523,
        "seid": "x123",
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
      disconnected: true,
    }),
  }

  await store.dispatch.basicInfo.disconnect()

  const state = store.getState()

  expect(state).toMatchInlineSnapshot(`
Object {
  "basicInfo": Object {
    "batteryLevel": 0,
    "disconnectedDevice": true,
    "lastBackup": "10.11.2019",
    "memorySpace": Object {
      "free": 0,
      "full": 16000000000,
    },
    "networkName": "",
    "osUpdateDate": "",
    "osVersion": "1.0",
    "simCards": Array [],
  },
}
`)
  expect(state.basicInfo.disconnectedDevice).toBeTruthy()
})

test("change sim switches active property on sim cards", async () => {
  const store = init({
    models: { basicInfo },
  })
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcRequest.GetDeviceInfo]: Promise.resolve({
      name: "Ziemniaczek",
      modelName: "U12300000",
      modelNumber: "A1239999",
      serilaNumber: "a-b-3d",
      osVersion: "0.123v",
      osUpdateDate: "12-12-2003",
    }),
    [IpcRequest.GetNetworkInfo]: Promise.resolve({
      simCards: [
        {
          active: true,
          carrier: "AAAAAAAAAAAA",
          iccid: 1234,
          imei: 5678,
          meid: 8765,
          network: "Y-Mobile",
          networkLevel: 0.5,
          number: 12345678,
          seid: "1234",
          slot: 1,
        },
        {
          active: false,
          carrier: "BBBBBBBBBBBB",
          iccid: 412,
          imei: 42,
          meid: 1410,
          network: "X-Mobile",
          networkLevel: 0.69,
          number: 7001234523,
          seid: "x123",
          slot: 2,
        },
      ],
    }),
    [IpcRequest.GetStorageInfo]: Promise.resolve({
      capacity: 9001,
      available: 99999999999999,
      categories: [
        { label: "music", filesCount: 1233333, size: 999999999 },
        { label: "storage", filesCount: 100000, size: 999999999 },
      ],
    }),
    [IpcRequest.GetBatteryInfo]: Promise.resolve({
      level: 9001,
      charging: false,
      maximumCapacity: 99999,
    }),
    [IpcRequest.GetBackupsInfo]: Promise.resolve({
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
    [IpcRequest.ChangeSim]: Promise.resolve({
      status: DeviceResponseStatus.Ok,
    }),
  }
  const simCard: SimCard = {
    network: "X-Mobile",
    number: 7001234523,
    slot: 2,
    active: false,
  }

  await store.dispatch.basicInfo.loadData()
  await store.dispatch.basicInfo.changeSim(simCard)

  expect(store.getState()).toMatchInlineSnapshot(`
Object {
  "basicInfo": Object {
    "batteryLevel": 9001,
    "disconnectedDevice": false,
    "lastBackup": "20-01-30T07:35:01.562Z20",
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
        "carrier": "AAAAAAAAAAAA",
        "iccid": 1234,
        "imei": 5678,
        "meid": 8765,
        "network": "Y-Mobile",
        "networkLevel": 0.5,
        "number": 12345678,
        "seid": "1234",
        "slot": 1,
      },
      Object {
        "active": true,
        "carrier": "BBBBBBBBBBBB",
        "iccid": 412,
        "imei": 42,
        "meid": 1410,
        "network": "X-Mobile",
        "networkLevel": 0.69,
        "number": 7001234523,
        "seid": "x123",
        "slot": 2,
      },
    ],
  },
}
`)
})
