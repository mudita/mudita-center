/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { DeviceManager } from "App/device/services/device-manager.service"
import DeviceService from "App/__deprecated__/backend/device-service"
import createPurePhoneAdapter from "App/__deprecated__/backend/adapters/pure-phone/pure-phone.adapter"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

jest.mock("App/__deprecated__/backend/device-service")

const deviceManager = {} as DeviceManager

test("Unlock device returns properly value", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: RequestResponseStatus.Ok,
        }
      },
    }
  })
  const deviceService = new DeviceService(deviceManager, ipcMain)

  const purePhoneAdapter = createPurePhoneAdapter(deviceService)
  const { status } = await purePhoneAdapter.unlockDevice("3333")
  expect(status).toEqual(RequestResponseStatus.Ok)
})

test("Get unlock device status returns properly value", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: RequestResponseStatus.Ok,
        }
      },
    }
  })
  const deviceService = new DeviceService(deviceManager, ipcMain)
  const purePhoneAdapter = createPurePhoneAdapter(deviceService)
  const { status } = await purePhoneAdapter.getUnlockDeviceStatus()
  expect(status).toEqual(RequestResponseStatus.Ok)
})
