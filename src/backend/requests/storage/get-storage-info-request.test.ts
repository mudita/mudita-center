import getFakeAdapters from "App/tests/get-fake-adapters"
import registerPurePhoneStorageRequest from "Backend/requests/storage/get-storage-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

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
  registerPurePhoneStorageRequest(getFakeAdapters())
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
