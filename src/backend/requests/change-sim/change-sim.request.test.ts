import getFakeAdapters from "App/tests/get-fake-adapters"
import registerChangeSimCardRequest from "Backend/requests/change-sim/change-sim.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

test("returns change sim info", () => {
  registerChangeSimCardRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.PostChangeSim)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "number": 12345678,
    }
  `)
})
