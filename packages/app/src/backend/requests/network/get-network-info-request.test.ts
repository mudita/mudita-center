import PureDeviceManager from "pure"
import registerNetworkInfoRequest from "Backend/requests/network/get-network-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import Adapters from "Backend/adapters/adapters.interface"
import MockPureNodeService from "Backend/mock-device-service"
import createPurePhoneNetwork from "Backend/adapters/pure-phone-network/pure-phone-network.adapter"

test("returns required network info", async () => {
  registerNetworkInfoRequest(({
    pureNetwork: createPurePhoneNetwork(
      new MockPureNodeService(PureDeviceManager, ipcMain)
    ),
  } as unknown) as Adapters)

  const [pendingResponse] = (ipcMain as any)._flush(IpcRequest.GetNetworkInfo)
  const result = await pendingResponse

  expect(result.data).toMatchInlineSnapshot(`
    Object {
      "simCards": Array [
        Object {
          "active": true,
          "network": "Y-Mobile",
          "networkLevel": 0.2,
          "number": 12345678,
          "slot": 1,
        },
      ],
    }
  `)
})
