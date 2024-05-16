/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import {
  MuditaPureDescriptor,
  MuditaHarmonyDescriptor,
} from "Core/device/descriptors"
import { DeviceFactory } from "Core/device/factories"
import { APIDevice } from "device/feature"
import { DeviceType } from "Core/device"
import { BaseDevice } from "Core/device/modules/base-device"

export interface IDeviceResolverService {
  resolve(portInfo: PortInfo): BaseDevice | undefined
}

export class DeviceResolverService implements IDeviceResolverService {
  private eligibleDevices = [MuditaPureDescriptor, MuditaHarmonyDescriptor]

  public resolve(portInfo: PortInfo): BaseDevice | undefined {
    const id = portInfo.productId?.toLowerCase() ?? ""
    const descriptor = this.eligibleDevices.find((device) =>
      device.productIds
        .map((item) => item.toString().toLowerCase())
        .includes(id)
    )

    if (descriptor) {
      return DeviceFactory.create(
        portInfo,
        descriptor.deviceType,
        descriptor.adapter,
        descriptor.strategy
      )
    }

    if (!descriptor) {
      //TODO: temporary, remove in future
      return new APIDevice(portInfo, DeviceType.APIDevice)
    }

    return
  }
}
