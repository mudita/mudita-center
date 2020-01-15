import Adapters from "Backend/adapters/adapters.interface"
import createFakeElectronAppAdapter from "Backend/adapters/electron-app/fake-electron-app.adapter"
import createFakePurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-fake.adapter"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerDeviceInfoRequest from "./get-device-info.request"

const adapters: Adapters = {
  app: createFakeElectronAppAdapter(),
  purePhone: createFakePurePhoneAdapter(),
}

jest.mock("electron-better-ipc", () => {
  const calls: Array<(...params: any[]) => any> = []
  return {
    ipcMain: {
      answerRenderer: jest.fn(
        (name, handler) =>
          name === IpcRequest.GetDeviceInfo && calls.push(handler)
      ),
      _flush: (value?: any) => calls.map(call => call(value)),
    },
  }
})

test("returns required device info", () => {
  registerDeviceInfoRequest(adapters)
  const [result] = (ipcMain as any)._flush()
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
