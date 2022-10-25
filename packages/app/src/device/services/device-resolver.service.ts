/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import {
  MuditaPureDescriptor,
  MuditaHarmonyDescriptor,
} from "App/device/descriptors"
import { Device } from "App/device/modules/device"
import { DeviceFactory } from "App/device/factories"

export class DeviceResolverService {
  private eligibleDevices = [MuditaPureDescriptor, MuditaHarmonyDescriptor]

  public resolve(
    portInfo: Pick<PortInfo, "productId">,
    path: string
  ): Device | undefined {
    const id = portInfo.productId?.toLowerCase() ?? ""
    const descriptor = this.eligibleDevices.find((device) =>
      device.productIds.map((item) => item.toLowerCase()).includes(id)
    )

    if (!descriptor) {
      return
    }

    return DeviceFactory.create(
      path,
      descriptor.deviceType,
      descriptor.adapter,
      descriptor.strategy
    )
  }
}
