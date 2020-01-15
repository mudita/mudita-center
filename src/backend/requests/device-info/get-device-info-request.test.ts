import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerDeviceInfoRequest from "./get-device-info.request"

test("returns required device info", () => {
  registerDeviceInfoRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.GetDeviceInfo)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "modelName": "Ziemniaczek Puree",
      "modelNumber": "Y0105W4GG1N5",
      "name": "Mudita Pure",
      "osUpdateDate": "2020-01-14T11:31:08.244Z",
      "osVersion": "3.1.0",
      "serialNumber": "1UB13213MN14K1",
    }
  `)
})
