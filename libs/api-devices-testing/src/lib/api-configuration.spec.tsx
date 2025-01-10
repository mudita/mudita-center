/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { APIConfigService } from "device/feature"

jest.mock("shared/utils", () => {
  return { callRenderer: () => {} }
})
jest.mock("Core/device-manager/services/usb-devices/usb-devices.helper", () => {
  return { getUsbDevices: () => {} }
})
jest.mock("electron-better-ipc", () => {
  return {
    ipcMain: {
      emit: () => {},
    },
  }
})

describe("API configuration", () => {
  let deviceProtocol: DeviceProtocol | undefined = undefined

  beforeEach(async () => {
    deviceProtocol = await setKompaktConnection()
  })

  afterEach(async () => {
    await deviceProtocol?.activeDevice?.disconnect()
  }, 10000)

  it("should receive API configuration", async () => {
    expect(deviceProtocol?.devices).toHaveLength(1)

    if (deviceProtocol === undefined) {
      return
    }

    deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

    const apiConfigService = new APIConfigService(deviceProtocol)

    const result = await apiConfigService.getAPIConfig()

    expect(result.ok).toBeTruthy()
  })
})
