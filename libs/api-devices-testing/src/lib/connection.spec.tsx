/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  DeviceProtocol,
  DeviceResolverService,
  SerialPortService,
} from "device-protocol/feature"
import { EventEmitter } from "events"

jest.mock("shared/utils", () => {
  return { callRenderer: () => {} }
})
jest.mock("Core/device-manager/services/usb-devices/usb-devices.helper", () => {
  return { getUsbDevices: () => {} }
})

describe("Connection", () => {
  it.each([{ vendorId: "3310", productId: "200a" }])(
    "should connect successfully",
    async ({ vendorId, productId }) => {
      const eventEmitter = new EventEmitter()

      const deviceProtocol = new DeviceProtocol(
        new SerialPortService(),
        new DeviceResolverService(),
        eventEmitter
      )
      expect(deviceProtocol.devices).toHaveLength(0)
      const attachedDevice = (await deviceProtocol.getAttachedDevices()).find(
        (port) => {
          return port.vendorId === vendorId && port.productId === productId
        }
      )

      expect(attachedDevice).toBeTruthy()
      if (attachedDevice === undefined) {
        return
      }

      await deviceProtocol.addDevice(attachedDevice)

      expect(deviceProtocol.devices).toHaveLength(1)
      await deviceProtocol.activeDevice?.disconnect()
    }
  )
})
