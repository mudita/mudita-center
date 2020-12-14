import PureDeviceManager from "pure"
import registerBatteryInfoRequest from "Backend/requests/battery/get-battery-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import createPurePhoneBatteryAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service.adapter"
import MockPureNodeService from "Backend/mock-device-service"
import Adapters from "Backend/adapters/adapters.interface"

test("returns required battery info", async () => {
  registerBatteryInfoRequest(({
    pureBatteryService: createPurePhoneBatteryAdapter(
      new MockPureNodeService(PureDeviceManager, ipcMain)
    ),
  } as unknown) as Adapters)
  const [pendingResponse] = (ipcMain as any)._flush(IpcRequest.GetBatteryInfo)
  const result = await pendingResponse

  expect(result.data).toMatchInlineSnapshot(`
    Object {
      "charging": true,
      "level": 0.35,
    }
  `)
})
