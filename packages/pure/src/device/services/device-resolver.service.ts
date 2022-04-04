/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MuditaPureDescriptor, MuditaHarmonyDescriptor } from "../descriptors"
import { Device } from "../device"
import { MuditaDevice, McSerialPortDevice } from "../device.types"
import { PortInfo } from "serialport"
import BaseMcSerialPortDevice from "../mc-serialport-device"
import BaseMcUsbDevice from "../mc-usb-device"
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
    const baseMcSerialPortDevice: McSerialPortDevice =
      new BaseMcSerialPortDevice(path, descriptor.deviceType)

    const baseMcUsbDevice: BaseMcUsbDevice = new BaseMcUsbDevice()

    return new Device(
      new descriptor.strategy(baseMcSerialPortDevice, baseMcUsbDevice)
    )
  }
}
