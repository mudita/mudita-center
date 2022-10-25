/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceManager } from "App/device/services/device-manager.service"
import { DeviceInfo } from "App/device/types/mudita-os"
import registerNetworkInfoRequest from "App/__deprecated__/backend/requests/network/get-network-info.request"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import DeviceService from "App/__deprecated__/backend/device-service"
import createPurePhoneNetwork from "App/__deprecated__/backend/adapters/pure-phone-network/pure-phone-network.adapter"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

const mockDeviceInfo: DeviceInfo = {
  accessTechnology: "255",
  batteryLevel: "35",
  batteryState: "1",
  currentRTCTime: "3000",
  systemReservedSpace: "13727",
  usedUserSpace: "99",
  deviceSpaceTotal: "13913",
  gitBranch: "EGD-4318_enable_service_desktop",
  gitRevision: "4973bab",
  gitTag: "release-0.46.1-33-g4973babd",
  networkOperatorName: "Y-Mobile",
  networkStatus: "2",
  selectedSim: "0",
  signalStrength: "1",
  trayState: "1",
} as unknown as DeviceInfo

jest.mock("App/__deprecated__/backend/device-service")

const deviceManager = {} as DeviceManager

test("returns required network info", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => ({
        data: mockDeviceInfo,
        status: RequestResponseStatus.Ok,
      }),
    }
  })
  registerNetworkInfoRequest({
    pureNetwork: createPurePhoneNetwork(
      new DeviceService(deviceManager, ipcMain)
    ),
  } as unknown as Adapters)

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  const [pendingResponse] = (ipcMain as any)._flush(IpcRequest.GetNetworkInfo)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = await pendingResponse

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(result.data).toMatchInlineSnapshot(`
    Object {
      "simCards": Array [
        Object {
          "active": true,
          "network": "Y-Mobile",
          "networkLevel": 0.25,
          "number": 12345678,
          "slot": 1,
        },
      ],
    }
  `)
})
