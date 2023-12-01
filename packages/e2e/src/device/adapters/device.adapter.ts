/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import SerialPort from "serialport"
import { DeviceAdapterClass } from "./device-adapter.class"
import { DeviceIdentity } from "../types"

export class DeviceAdapter implements DeviceAdapterClass {
  public async getDeviceByDescription(
    identity: DeviceIdentity
  ): Promise<PortInfo> {
    const ports = (await SerialPort.list()) as PortInfo[]
    return ports.find((port) => {
      return (
        port.vendorId === identity.vendorId &&
        port.productId === identity.productId
      )
    })
  }
}
