import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerAppSettingsUpdateRequest from "Backend/requests/app-settings/update-app-settings.request"

test("updates app settings properly", async () => {
  registerAppSettingsUpdateRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.UpdateAppSettings)
  expect(await result).toMatchInlineSnapshot(`undefined`)
})
