/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Device } from "Core/device/modules/device"
import { DeviceType } from "Core/device/constants"
import { DeviceDescriptor } from "Core/device/descriptors"

export class DeviceFactory {
  static create(
    path: string,
    serialNumber: string,
    deviceType: DeviceType,
    Adapter: DeviceDescriptor["adapter"],
    Strategy: DeviceDescriptor["strategy"]
  ): Device {
    return new Device(
      path,
      serialNumber,
      deviceType,
      new Strategy(new Adapter(path))
    )
  }
}
