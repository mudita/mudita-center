/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "app-utils/models"
import { usb, UsbDetect } from "./usb"
import { NodeMtpDevice } from "./node-mtp-device"
import { MtpDevice, MTPError } from "../app-mtp.interface"

export class NodeMtpDeviceManager {
  private nodeMtpDevices: Map<string, NodeMtpDevice> = new Map()

  constructor() {
    this.startDetachedDeviceWatcher()
  }

  async getDevices(): Promise<MtpDevice[]> {
    const devices = await usb.getDevices()

    return devices.map((device) => ({
      id: device.serialNumber ?? "",
      name: device.productName ?? "",
    }))
  }

  async getNodeMtpDevice({
    id,
  }: {
    id: MtpDevice["id"]
  }): Promise<NodeMtpDevice> {
    if (this.nodeMtpDevices.has(id)) {
      return this.nodeMtpDevices.get(id)!
    }

    const devices = await usb.getDevices()
    const device = devices.find(({ serialNumber }) => serialNumber === id)

    if (!device) {
      throw new AppError("", MTPError.MTP_DEVICE_NOT_FOUND)
    }

    const nodeMtpDevice = new NodeMtpDevice(device)

    await nodeMtpDevice.initialize()
    this.nodeMtpDevices.set(id, nodeMtpDevice)
    return nodeMtpDevice
  }

  private startDetachedDeviceWatcher() {
    UsbDetect.ondetach = async () => {
      const attachedDevices = await this.getDevices()
      const attachedDeviceIds = new Set(attachedDevices.map(({ id }) => id))

      this.nodeMtpDevices.forEach((_, id) => {
        if (!attachedDeviceIds.has(id)) {
          this.nodeMtpDevices.delete(id)
        }
      })
    }
  }
}
