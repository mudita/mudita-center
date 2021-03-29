/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PureDeviceManager, { DeviceInfo } from "@mudita/pure"
import registerBatteryInfoRequest from "Backend/requests/battery/get-battery-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import createPurePhoneBatteryAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service.adapter"
import DeviceService from "Backend/device-service"
import Adapters from "Backend/adapters/adapters.interface"
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

test("returns required battery info", async () => {
  ;(DeviceService as jest.Mock).mockImplementation(() => {
    return {
      request: () => ({
        data: mockDeviceInfo,
        status: DeviceResponseStatus.Ok,
      }),
    }
  })
  registerBatteryInfoRequest(({
    pureBatteryService: createPurePhoneBatteryAdapter(
      new DeviceService(PureDeviceManager, ipcMain)
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
