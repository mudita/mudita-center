import getFakeAdapters from "App/tests/get-fake-adapters"
import registerPurePhoneStorageRequest from "Backend/requests/storage/get-storage-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

test("returns required storage info", () => {
  registerPurePhoneStorageRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.GetStorageInfo)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "available": 1717986918,
      "capacity": 17179869184,
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
