/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { usb } from "./usb"
import { NodeMtpDevice } from "./node-mtp-device"
import { MtpDevice } from "../app-mtp.interface"

export class NodeMtpDeviceManager {
  async getDevices(): Promise<MtpDevice[]> {
    const devices = await usb.getDevices()

    return devices.map((device) => ({
      id: device.serialNumber,
      name: device.productName,
    }))
  }

  getDevice(): NodeMtpDevice {
    // mock implementation
    return new NodeMtpDevice()
  }
}
