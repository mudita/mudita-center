import getFakeAdapters from "App/tests/get-fake-adapters"
import registerBatteryInfoRequest from "Backend/requests/battery/get-battery-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

test("returns required battery info", () => {
  registerBatteryInfoRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.GetBatteryInfo)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "charging": false,
      "level": 0.5,
      "maximumCapacity": 0.95,
    }
  `)
})
