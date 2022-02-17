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
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerDeviceInfoRequest from "./get-device-info.request"
import DeviceService from "Backend/device-service"
import Adapters from "Backend/adapters/adapters.interface"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import createDeviceBaseInfoAdapter from "Backend/adapters/device-base-info/device-base-info.adapter"

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

jest.mock("Backend/device-service")

test("returns required device info", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => ({
        data: mockDeviceInfo,
        status: DeviceResponseStatus.Ok,
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
