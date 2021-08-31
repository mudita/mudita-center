/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  MuditaPureDevice,
  MuditaHarmonyDevice,
  DeviceDescriptorClass,
} from "../descriptors"
import { PortInfo } from "serialport"

export class DeviceTypeResolverService {
  private eligibleDevices = [MuditaPureDevice, MuditaHarmonyDevice]

  public resolve(
    portInfo: Pick<PortInfo, "productId">
  ): DeviceDescriptorClass | undefined {
    const id = portInfo.productId?.toLowerCase() ?? ""
    return this.eligibleDevices.find((device) =>
      device.productIds.map((item) => item.toLowerCase()).includes(id)
    )
  }
}
