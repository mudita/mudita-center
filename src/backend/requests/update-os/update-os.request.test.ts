import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerUpdateOsRequest from "Backend/requests/update-os/update-os.request"

test("asda", () => {
  registerUpdateOsRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.UpdateOs)
  expect(result).toMatchInlineSnapshot(`"lala"`)
})
