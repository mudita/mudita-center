/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PureDeviceManager, { DeviceInfo } from "@mudita/pure"
import registerNetworkInfoRequest from "Backend/requests/network/get-network-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import Adapters from "Backend/adapters/adapters.interface"
import DeviceService from "Backend/device-service"
import createPurePhoneNetwork from "Backend/adapters/pure-phone-network/pure-phone-network.adapter"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"

const mockDeviceInfo: DeviceInfo = ({
  accessTechnology: "255",
  batteryLevel: "35",
  batteryState: "1",
  currentRTCTime: "3000",
  fsFree: "13727",
  fsFreePercent: "99",
  fsTotal: "13913",
  gitBranch: "EGD-4318_enable_service_desktop",
  gitRevision: "4973bab",
  gitTag: "release-0.46.1-33-g4973babd",
  networkStatus: "2",
  selectedSim: "0",
  signalStrength: "1",
  trayState: "1",
} as unknown) as DeviceInfo

jest.mock("Backend/device-service")

test("returns required network info", async () => {
  ;(DeviceService as jest.Mock).mockImplementation(() => {
    return {
      request: () => ({
        data: mockDeviceInfo,
        status: DeviceResponseStatus.Ok,
      }),
    }
  })
  registerNetworkInfoRequest(({
    pureNetwork: createPurePhoneNetwork(
      new DeviceService(PureDeviceManager, ipcMain)
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
