import { init } from "@rematch/core"
import basicInfo from "./basic-info"
import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { SimCard } from "Renderer/models/basic-info/basic-info.typings"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { commonCalls } from "Renderer/models/basic-info/utils/test-helpers"

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
        "disconnectedDevice": true,
        "resultsState": 2,
      },
    }
  `)
})

//TODO: handle this test case after implement mock in adapter https://appnroll.atlassian.net/browse/PDA-588
test.skip("mock calls update state", async () => {
  const store = init({
    models: { basicInfo },
  })
  ;(ipcRenderer as any).__rendererCalls = {
    ...commonCalls,
  }

  await store.dispatch.basicInfo.loadData()

  console.log("store.getState(): ", store.getState())
  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "batteryLevel": 9001,
        "disconnectedDevice": true,
        "resultsState": 2,
        "lastBackup": Object {
          "createdAt": "20-11-15T07:35:01.562Z20",
          "size": 99999,
        },
        "memorySpace": Object {
          "free": 99999999999999,
          "full": 9001,
        },
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
        "disconnectedDevice": true,
        "resultsState": 2,
      },
    }
  `)
})

//TODO: handle this test case after implement mock in adapter https://appnroll.atlassian.net/browse/PDA-588
test.skip("change sim switches active property on sim cards", async () => {
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

  await store.dispatch.basicInfo.loadData()
  await store.dispatch.basicInfo.changeSim(simCard)

  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "basicInfo": Object {
        "batteryLevel": 9001,
        "disconnectedDevice": true,
        "lastBackup": Object {
          "createdAt": "20-11-15T07:35:01.562Z20",
          "size": 99999,
        },
        "memorySpace": Object {
          "free": 99999999999999,
          "full": 9001,
        },
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
