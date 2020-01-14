import Adapters from "Backend/adapters/adapters.interface"
import createFakeElectronAppAdapter from "Backend/adapters/electron-app/fake-electron-app.adapter"
import createFakePurePhoneBatteryAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service-fake.adapter"
import createFakePurePhoneStorageAdapter from "Backend/adapters/pure-phone-storage/pure-phone-storage-fake.adapter"
import createFakePurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-fake.adapter"
import registerPurePhoneStorageRequest from "Backend/requests/storage/get-storage-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

const adapters: Adapters = {
  app: createFakeElectronAppAdapter(),
  purePhone: createFakePurePhoneAdapter(),
  pureBatteryService: createFakePurePhoneBatteryAdapter(),
  pureStorage: createFakePurePhoneStorageAdapter(),
}

jest.mock("electron-better-ipc", () => {
  const calls: Array<(...params: any[]) => any> = []
  return {
    ipcMain: {
      answerRenderer: jest.fn(
        (name, handler) =>
          name === IpcRequest.GetStorageInfo && calls.push(handler)
      ),
      _flush: (value?: any) => calls.map(call => call(value)),
    },
  }
})

test("returns required device info", () => {
  registerPurePhoneStorageRequest(adapters)
  const [result] = (ipcMain as any)._flush()
  expect(result).toMatchInlineSnapshot(`
    Object {
      "available": 4000,
      "capacity": 10000,
      "categories": Array [
        Object {
          "filesCount": 42,
          "label": "music",
          "size": 1000,
        },
        Object {
          "filesCount": 6,
          "label": "storage",
          "size": 2000,
        },
        Object {
          "filesCount": 9,
          "label": "voice recorder",
          "size": 3000,
        },
      ],
    }
  `)
})
