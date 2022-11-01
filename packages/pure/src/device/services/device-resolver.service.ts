/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MuditaPureDescriptor, MuditaHarmonyDescriptor } from "../descriptors/index.js"
import { Device } from "../device.js"
import { MuditaDevice } from "../device.types.js"
import { PortInfo } from "serialport"
import { SerialPortParser } from "../serial-port-parser/serial-port-parser.js"

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

    return new Device(new descriptor.strategy(path, descriptor.deviceType, new SerialPortParser()))
  }
}
