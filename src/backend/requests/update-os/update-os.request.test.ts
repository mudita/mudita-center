import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerUpdateOsRequest from "Backend/requests/update-os/update-os.request"
import DeviceResponse from "Backend/adapters/device-response.interface"

test("returns update os info", (done) => {
  registerUpdateOsRequest(getFakeAdapters())
  const [promise] = (ipcMain as any)._flush(IpcRequest.UpdateOs, {
    fileName: "",
    progressChannel: "",
  })
  promise.then((result: DeviceResponse) => {
    expect(result).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
    done()
  })
})
