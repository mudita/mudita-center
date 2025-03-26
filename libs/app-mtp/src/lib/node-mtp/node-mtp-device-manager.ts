/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { usb } from "./usb"
import { NodeMtpDevice } from "./node-mtp-device"
import { MtpDevice, MTPError } from "../app-mtp.interface"
import { AppError } from "../../../../core/core/errors/app-error"

export class NodeMtpDeviceManager {
  async getDevices(): Promise<MtpDevice[]> {
    const devices = await usb.getDevices()

    return devices.map((device) => ({
      id: device.serialNumber,
      name: device.productName,
    }))
  }

  async getDevice({ id }: Partial<MtpDevice>): Promise<NodeMtpDevice> {
    const devices = await usb.getDevices()
    const device = devices.find((device) => device.serialNumber === id)

    if (!device) {
      throw new AppError(MTPError.MTP_DEVICE_NOT_FOUND)
    }

    const nodeMtpDevice = new NodeMtpDevice(device)

    await nodeMtpDevice.initialize()

    return nodeMtpDevice
  }
}
