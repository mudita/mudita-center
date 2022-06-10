/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MuditaDeviceManager, {
  AccessTechnology,
  BatteryState,
  CaseColour,
  DeviceInfo,
  NetworkStatus,
  SignalStrength,
  SIM,
  Tray,
} from "@mudita/pure"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerDeviceInfoRequest from "./get-device-info.request"
import DeviceService from "App/__deprecated__/backend/device-service"
import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createDeviceBaseInfoAdapter from "App/__deprecated__/backend/adapters/device-base-info/device-base-info.adapter"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

const mockDeviceInfo: DeviceInfo = {
  backupLocation: "",
  networkOperatorName: "",
  accessTechnology: AccessTechnology.Gsm,
  batteryLevel: "35",
  batteryState: BatteryState.Discharging,
  currentRTCTime: "3000",
  fsFree: "13727",
  fsFreePercent: "99",
  fsTotal: "13913",
  gitBranch: "EGD-4318_enable_service_desktop",
  gitRevision: "4973bab",
  version: "release-0.46.1-33-g4973babd",
  networkStatus: NetworkStatus.NotRegistered,
  selectedSim: SIM.One,
  signalStrength: SignalStrength.One,
  trayState: Tray.In,
  serialNumber: "1UB13213MN14K1",
  caseColour: CaseColour.Gray,
  deviceToken: "Nr8uiSV7KmWxX3WOFqZPF7uB+Zx8qaPa",
}

jest.mock("App/__deprecated__/backend/device-service")

test("returns required device info", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => ({
        data: mockDeviceInfo,
        status: RequestResponseStatus.Ok,
      }),
    }
  })
  const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
  registerDeviceInfoRequest({
    deviceBaseInfo: createDeviceBaseInfoAdapter(deviceService),
  } as unknown as Adapters)
  const [pendingResponse] = (ipcMain as any)._flush(IpcRequest.GetDeviceInfo)
  const result = await pendingResponse

  expect(result.data).toMatchInlineSnapshot(`
    Object {
      "backupLocation": "",
      "caseColour": "gray",
      "deviceToken": "Nr8uiSV7KmWxX3WOFqZPF7uB+Zx8qaPa",
      "osVersion": "release-0.46.1-33-g4973babd",
      "serialNumber": "1UB13213MN14K1",
    }
  `)
})
