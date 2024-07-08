/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { CoreDevice } from "Core/device/modules/core-device"
import { DeviceType } from "device-protocol/models"
import { DeviceDescriptor } from "Core/device/descriptors"

export class DeviceFactory {
  static create(
    portInfo: PortInfo,
    deviceType: DeviceType,
    Adapter: DeviceDescriptor["adapter"],
    Strategy: DeviceDescriptor["strategy"]
  ): CoreDevice {
    return new CoreDevice(
      portInfo,
      deviceType,
      new Strategy(new Adapter(portInfo.path))
    )
  }
}
