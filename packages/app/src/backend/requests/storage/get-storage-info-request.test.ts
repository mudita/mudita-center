import PureDeviceManager from "@mudita/mudita-center-pure"
import registerPurePhoneStorageRequest from "Backend/requests/storage/get-storage-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import createPurePhoneStorageAdapter from "Backend/adapters/pure-phone-storage/pure-phone-storage.adapter"
import MockPureNodeService from "Backend/mock-device-service"
import Adapters from "Backend/adapters/adapters.interface"

test("returns required storage info", async () => {
  registerPurePhoneStorageRequest(({
    pureStorage: createPurePhoneStorageAdapter(
      new MockPureNodeService(PureDeviceManager, ipcMain)
    ),
  } as unknown) as Adapters)

  const [pendingResponse] = (ipcMain as any)._flush(IpcRequest.GetStorageInfo)
  const result = await pendingResponse

  expect(result.data).toMatchInlineSnapshot(`
    Object {
      "available": 13727,
      "capacity": 13913,
      "categories": Array [],
    }
  `)
})
