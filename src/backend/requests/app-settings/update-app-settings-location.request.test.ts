import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerAppSettingsUpdateLocationRequest from "Backend/requests/app-settings/update-app-settings-location.request"

test("updates app settings properly", async () => {
  registerAppSettingsUpdateLocationRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.UpdateAppSettingsLocation)
  expect(await result).toMatchInlineSnapshot(`null`)
})
