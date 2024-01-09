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

export class DeviceResolverService {
  private eligibleDevices = [
    MuditaPureDescriptor,
    MuditaHarmonyDescriptor,
  ]

  constructor() {}

  public resolve({
    productId,
    serialNumber,
    path,
  }: PortInfo): BaseDevice | undefined {
    const id = productId?.toLowerCase() ?? ""
    const descriptor = this.eligibleDevices.find((device) =>
      device.productIds
        .map((item) => item.toString().toLowerCase())
        .includes(id)
    )

    if (descriptor) {
      return DeviceFactory.create(
        path,
        serialNumber,
        descriptor.deviceType,
        descriptor.adapter,
        descriptor.strategy
      )
    }

    if (
      !descriptor &&
      process.env.FEATURE_TOGGLE_ENVIRONMENT === "development"
    ) {
      const id = DeviceFactory.generateDeviceIdBySerialNumber(serialNumber)
      //TODO: temporary, remove in future
      return new APIDevice(
        id,
        path,
        serialNumber,
        DeviceType.APIDevice
      )
    }

    return
  }
}
