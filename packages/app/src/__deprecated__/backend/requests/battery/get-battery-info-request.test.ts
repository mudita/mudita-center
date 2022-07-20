/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MuditaDeviceManager, { DeviceInfo } from "@mudita/pure"
import registerBatteryInfoRequest from "App/__deprecated__/backend/requests/battery/get-battery-info.request"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import createPurePhoneBatteryAdapter from "App/__deprecated__/backend/adapters/pure-phone-battery-service/pure-phone-battery-service.adapter"
import DeviceService from "App/__deprecated__/backend/device-service"
import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

const mockDeviceInfo: DeviceInfo = {
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
} as unknown as DeviceInfo

jest.mock("App/__deprecated__/backend/device-service")

test("returns required battery info", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => ({
        data: mockDeviceInfo,
        status: RequestResponseStatus.Ok,
      }),
    }
  })
  registerBatteryInfoRequest({
    pureBatteryService: createPurePhoneBatteryAdapter(
      new DeviceService(MuditaDeviceManager, ipcMain)
    ),
  } as unknown as Adapters)
  const [pendingResponse] = (ipcMain as any)._flush(IpcRequest.GetBatteryInfo)
  const result = await pendingResponse

  expect(result.data).toMatchInlineSnapshot(`
    Object {
      "charging": true,
      "level": 0.35,
    }
  `)
})
