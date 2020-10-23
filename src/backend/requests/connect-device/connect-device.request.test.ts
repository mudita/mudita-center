import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"
import registerConnectDeviceRequest from "./connect-device.request"

test("returns disconnected info", (done) => {
  registerConnectDeviceRequest(getFakeAdapters())
  const [promise] = (ipcMain as any)._flush(IpcRequest.ConnectDevice)
  promise.then((result: DeviceResponse) => {
    expect(result).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
    done()
  })
})
