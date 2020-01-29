import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerDisconnectDeviceRequest from "./disconnect-device.request"

test("returns disconnected info", () => {
  registerDisconnectDeviceRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.PostDisconnectDevice)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "disconnected": true,
    }
  `)
})
