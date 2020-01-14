import Adapters from "Backend/adapters/adapters.interface"
import createFakeElectronAppAdapter from "Backend/adapters/electron-app/fake-electron-app.adapter"
import createFakePurePhoneBatteryAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service-fake.adapter"
import createFakePurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-fake.adapter"
import registerBatteryInfoRequest from "Backend/requests/battery/get-battery-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

const adapters: Adapters = {
  app: createFakeElectronAppAdapter(),
  purePhone: createFakePurePhoneAdapter(),
  pureBatteryService: createFakePurePhoneBatteryAdapter(),
}

jest.mock("electron-better-ipc", () => {
  const calls: Array<(...params: any[]) => any> = []
  return {
    ipcMain: {
      answerRenderer: jest.fn(
        (name, handler) =>
          name === IpcRequest.GetBatteryInfo && calls.push(handler)
      ),
      _flush: (value?: any) => calls.map(call => call(value)),
    },
  }
})

test("returns required device info", () => {
  registerBatteryInfoRequest(adapters)
  const [result] = (ipcMain as any)._flush()
  expect(result).toMatchInlineSnapshot(`
    Object {
      "charging": false,
      "level": 0.5,
      "maximumCapacity": 0.95,
    }
  `)
})
