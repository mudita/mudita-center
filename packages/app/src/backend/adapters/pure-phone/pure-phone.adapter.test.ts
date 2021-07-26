/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import DeviceService from "Backend/device-service"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import createPurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone.adapter"
import PureDeviceManager from "@mudita/pure"
import DeviceFileSystemService from "Backend/device-file-system-service/device-file-system-service"

jest.mock("Backend/device-service")
jest.mock("Backend/device-file-system-service/device-file-system-service")

test("unlock device returns properly value", async () => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: DeviceResponseStatus.Ok,
        }
      },
    }
  })
  const deviceService = new DeviceService(PureDeviceManager, ipcMain)
  const deviceFileSystemService = new DeviceFileSystemService(deviceService)

  const purePhoneAdapter = createPurePhoneAdapter(
    deviceService,
    deviceFileSystemService
  )
  const { status } = await purePhoneAdapter.unlockDevice("3333")
  expect(status).toEqual(DeviceResponseStatus.Ok)
})

test("get unlock device status returns properly value", async () => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: DeviceResponseStatus.Ok,
        }
      },
    }
  })
  const deviceService = new DeviceService(PureDeviceManager, ipcMain)
  const deviceFileSystemService = new DeviceFileSystemService(deviceService)

  const purePhoneAdapter = createPurePhoneAdapter(
    deviceService,
    deviceFileSystemService
  )
  const { status } = await purePhoneAdapter.getUnlockDeviceStatus()
  expect(status).toEqual(DeviceResponseStatus.Ok)
})
