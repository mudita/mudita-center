/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Device } from "Core/device/modules/device"
import { DeviceType } from "Core/device/constants"
import { DeviceDescriptor } from "Core/device/descriptors"
import { DeviceId } from "Core/device/constants/device-id"

const uniqueId = (length = 16): DeviceId => {
  return String(
    parseInt(
      Math.ceil(Math.random() * Date.now())
        .toPrecision(length)
        .toString()
        .replace(".", "")
    )
  )
}

const generateDeviceIdBySerialNumber = (
  serialNumber: string | undefined
): DeviceId => {
  if (serialNumber === undefined) {
    return uniqueId()
  } else if (serialNumber === "00000000000000") {
    return uniqueId()
  } else {
    return serialNumber
  }
}

export class DeviceFactory {
  static create(
    path: string,
    serialNumber: string | undefined,
    deviceType: DeviceType,
    Adapter: DeviceDescriptor["adapter"],
    Strategy: DeviceDescriptor["strategy"]
  ): Device {
    const id = generateDeviceIdBySerialNumber(serialNumber)

    return new Device(
      id,
      path,
      serialNumber,
      deviceType,
      new Strategy(new Adapter(path))
    )
  }
}
