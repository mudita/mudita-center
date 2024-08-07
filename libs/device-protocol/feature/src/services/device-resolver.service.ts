/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { APIDevice, MSCDevice } from "device/feature"
import { DeviceType } from "device-protocol/models"
import {
  MuditaPureDescriptor,
  MuditaHarmonyDescriptor,
  MuditaHarmonyMscDescriptor,
} from "Core/device/descriptors"
import { DeviceFactory } from "Core/device/factories"
import { BaseDevice } from "Core/device/modules/base-device"

export interface IDeviceResolverService {
  resolve(portInfo: PortInfo): BaseDevice | undefined
}

export class DeviceResolverService implements IDeviceResolverService {
  private eligibleDevices = [MuditaPureDescriptor, MuditaHarmonyDescriptor]

  private mscDevices = [MuditaHarmonyMscDescriptor]

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

    const mscDescriptor = this.mscDevices.find((device) =>
      device.productIds
        .map((item) => item.toString().toLowerCase())
        .includes(id)
    )

    if (mscDescriptor) {
      return new MSCDevice(portInfo, DeviceType.MuditaHarmonyMsc)
    }

    return new APIDevice(portInfo, DeviceType.APIDevice)
  }
}
