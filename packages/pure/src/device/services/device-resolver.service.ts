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
import {
  McUsbDevice,
  McUsbDeviceClass,
  UsbDeviceServiceFactory,
} from "../../mc-usb-device"

export class DeviceResolverService {
  private eligibleDevices = [MuditaPureDescriptor, MuditaHarmonyDescriptor]

  public resolve(
    portInfo: Pick<PortInfo, "productId">,
    path: string
  ): MuditaDevice | undefined {
    const id = portInfo.productId?.toLowerCase() ?? ""
    const descriptor = this.eligibleDevices.find((device) =>
      device.productIds.map((item) => item.toLowerCase()).includes(id)
    )

    if (!descriptor) {
      return
    }
    const mcSerialPortDevice: McSerialPortDeviceClass = new McSerialPortDevice(
      path,
      descriptor.deviceType
    )
    const usbDeviceService = UsbDeviceServiceFactory.create(descriptor)

    const mcUsbDevice: McUsbDeviceClass = new McUsbDevice(usbDeviceService)

    return new Device(new descriptor.strategy(mcSerialPortDevice, mcUsbDevice))
  }
}
