/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PureDeviceManager, { DeviceInfo } from "@mudita/pure"
import registerPurePhoneStorageRequest from "Backend/requests/storage/get-storage-info.request"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import createPurePhoneStorageAdapter from "Backend/adapters/pure-phone-storage/pure-phone-storage.adapter"
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

test("returns required storage info", async () => {
  ;(DeviceService as jest.Mock).mockImplementation(() => {
    return {
      request: () => ({
        data: mockDeviceInfo,
        status: DeviceResponseStatus.Ok,
      }),
    }
  })

  registerPurePhoneStorageRequest(({
    pureStorage: createPurePhoneStorageAdapter(
      new DeviceService(PureDeviceManager, ipcMain)
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
