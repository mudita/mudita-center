import getFakeAdapters from "App/tests/get-fake-adapters"
import registerNetworkInfoRequest from "Backend/requests/network/get-network-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

test("returns required network info", () => {
  registerNetworkInfoRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.GetNetworkInfo)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "simCards": Array [
        Object {
          "active": true,
          "carrier": "Yo mama 36.0",
          "iccid": 1234,
          "imei": 5678,
          "meid": 8765,
          "network": "Yo mama",
          "networkLevel": 0.5,
          "number": 12345678,
          "seid": "1234",
          "slot": 1,
        },
        Object {
          "active": false,
          "carrier": "X-Mobile 69",
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
    }
  `)
})
