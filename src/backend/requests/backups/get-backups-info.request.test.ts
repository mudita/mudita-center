import getFakeAdapters from "App/tests/get-fake-adapters"
import registerBackupsInfoRequest from "Backend/requests/backups/get-backups-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

test("returns required backups info", () => {
  registerBackupsInfoRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.GetBackupsInfo)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "backups": Array [
        Object {
          "createdAt": 2020-01-01T00:00:00.000Z,
          "size": 100000,
        },
      ],
    }
  `)
})
