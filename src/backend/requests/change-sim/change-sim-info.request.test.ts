import getFakeAdapters from "App/tests/get-fake-adapters"
import registerChangeSimCardInfoRequest from "Backend/requests/change-sim/change-sim-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

test("returns change sim info", () => {
  registerChangeSimCardInfoRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.GetChangeSimInfo)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "number": 12345678,
    }
  `)
})
