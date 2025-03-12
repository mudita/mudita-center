/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { APIOutboxService } from "device/feature"
import { setActiveDevice } from "./helpers/protocol-validator"
import { GeneralError, Outbox } from "device/models"

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

let deviceProtocol: DeviceProtocol
let deviceId: string | undefined
const dummyDeviceId = "dummyDeviceID"

describe("Outbox", () => {
  beforeAll(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
    deviceId = deviceProtocol.activeDevice?.id
    await deviceProtocol.activeDevice?.disconnect()
  })

  beforeEach(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
  })

  afterEach(async () => {
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  it("should return valid outbox response for valid deviceId", async () => {
    expect(deviceId).toBeDefined()
    if (deviceId == undefined) {
      return
    }
    const apiOutboxService = new APIOutboxService(deviceProtocol)
    const result = await apiOutboxService.getOutboxData(deviceId)
    expect(result.ok).toBeTruthy()
    const data = result.data as Outbox
    expect(data.features).toEqual(expect.any(Array))
    expect(data.entities).toEqual(expect.any(Array))
    expect(data.data).toEqual(expect.any(Array))
  })

  it("should return error outbox response for invalid deviceId", async () => {
    expect(deviceId).toBeDefined()
    if (deviceId == undefined) {
      return
    }
    const apiOutboxService = new APIOutboxService(deviceProtocol)
    const result = await apiOutboxService.getOutboxData(dummyDeviceId)
    expect(result.ok).toBeFalsy()
    expect(result.error?.type).toBe(GeneralError.NoDevice)
  })
})
