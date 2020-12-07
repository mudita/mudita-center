import getFakeAdapters from "App/tests/get-fake-adapters"
import registerBackupsInfoRequest from "Backend/requests/backups/get-backups-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

jest.mock("pure")

test("returns required backups info", async () => {
  registerBackupsInfoRequest(getFakeAdapters())
  const [pendingResponse] = (ipcMain as any)._flush(IpcRequest.GetBackupsInfo)
  const result = await pendingResponse

  expect(result.data).toMatchInlineSnapshot(`
    Object {
      "backups": Array [
        Object {
          "createdAt": "2020-01-15T07:35:01.562Z",
          "size": 1234,
        },
      ],
    }
  `)
})
