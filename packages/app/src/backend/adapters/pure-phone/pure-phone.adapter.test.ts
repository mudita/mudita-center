/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceService from "Backend/device-service"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import createPurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone.adapter"
import PureDeviceManager from "@mudita/pure"
import { ipcMain } from "electron-better-ipc"

jest.mock("Backend/device-service")

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
  const purePhoneAdapter = createPurePhoneAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const { status } = await purePhoneAdapter.unlockDevice("3333")
  expect(status).toEqual(DeviceResponseStatus.Ok)
})
