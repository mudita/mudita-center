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

export const setConnection = async (vendorId: string, productId: string) => {
  const eventEmitter = new EventEmitter()

  const deviceProtocol = new DeviceProtocol(
    new SerialPortService(),
    new DeviceResolverService(),
    eventEmitter
  )
  const attachedDevice = (await deviceProtocol.getAttachedDevices()).find(
    (port) => {
      return port.vendorId?.toLowerCase() === vendorId.toLowerCase() && port.productId?.toLowerCase() === productId.toLowerCase()
    }
  )

  if (attachedDevice === undefined) {
    return
  }

  await deviceProtocol.addDevice(attachedDevice)

  return deviceProtocol
}

export const setKompaktConnection = () => {
  return setConnection("0e8d", "200a")
}
