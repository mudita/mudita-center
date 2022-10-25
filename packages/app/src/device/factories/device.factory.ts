/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Device } from "App/device/modules/device"
import { DeviceType } from "App/device/constants"
import { DeviceDescriptor } from "App/device/descriptors"

export class DeviceFactory {
  static create(
    path: string,
    deviceType: DeviceType,
    Adapter: DeviceDescriptor["adapter"],
    Strategy: DeviceDescriptor["strategy"]
  ): Device {
    return new Device(path, deviceType, new Strategy(new Adapter(path)))
  }
}
