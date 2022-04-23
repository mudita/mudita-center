/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { MuditaPureDescriptor, MuditaHarmonyDescriptor } from "../descriptors"
import { Device } from "../device"
import McSerialPortDevice from "../../mc-serial-port-device/mc-serial-port-device"
import { MuditaDevice } from "../mudita-device"
import { McSerialPortDeviceClass } from "../../mc-serial-port-device/mc-serial-port-device.class"
import { McUsbDeviceFactory } from "../../mc-usb-device/mc-usb-device.factory"
import { McUsbDeviceClass } from "../../mc-usb-device/mc-usb-device.class"
import { McUsbDevice } from "../../mc-usb-device/mc-usb-device"
import { Parser } from "../../mc-serial-port-device/parser"

export class DeviceResolverService {
  private eligibleDevices = [MuditaPureDescriptor, MuditaHarmonyDescriptor]

  public async resolve(portInfo: PortInfo): Promise<MuditaDevice | undefined> {
    const id = portInfo.productId?.toLowerCase() ?? ""
    const descriptor = this.eligibleDevices.find((device) =>
      device.productIds.map((item) => item.toLowerCase()).includes(id)
    )

    if (!descriptor) {
      return
    }
    const mcSerialPortDevice: McSerialPortDeviceClass = new McSerialPortDevice(
      portInfo.path,
      descriptor.deviceType,
      new Parser()
    )

    const mcUsbDeviceService = await McUsbDeviceFactory.create({
      vendorId: 13072,
      productId: 256,
      serialNumber: portInfo.serialNumber,
    })

    const mcUsbDevice: McUsbDeviceClass = new McUsbDevice(mcUsbDeviceService)

    return new Device(new descriptor.strategy(mcSerialPortDevice, mcUsbDevice))
  }
}
