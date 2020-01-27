import getFakeAdapters from "App/tests/get-fake-adapters"
import registerDisconnectInfoRequest from "Backend/requests/disconnect-info/get-disconnect-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

test("returns required battery info", () => {
  registerDisconnectInfoRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.GetDisconnectInfo)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "disconnected": true,
    }
  `)
})
