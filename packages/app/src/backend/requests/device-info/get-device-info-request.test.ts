import PureDeviceManager from "@mudita/pure"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerDeviceInfoRequest from "./get-device-info.request"
import createPurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone.adapter"
import MockPureNodeService from "Backend/mock-device-service"
import Adapters from "Backend/adapters/adapters.interface"

test("returns required device info", async () => {
  registerDeviceInfoRequest(({
    purePhone: createPurePhoneAdapter(
      new MockPureNodeService(PureDeviceManager, ipcMain)
    ),
  } as unknown) as Adapters)
  const [pendingResponse] = (ipcMain as any)._flush(IpcRequest.GetDeviceInfo)
  const result = await pendingResponse

  expect(result.data).toMatchInlineSnapshot(`
    Object {
      "modelName": "Ziemniaczek Puree",
      "modelNumber": "Y0105W4GG1N5",
      "name": "Mudita Pure",
      "osUpdateDate": "2020-01-14T11:31:08.244Z",
      "osVersion": "release-0.46.1-33-g4973babd",
      "serialNumber": "1UB13213MN14K1",
    }
  `)
})
