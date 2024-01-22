/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { ResultObject } from "Core/core/builder"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"
import { DeviceId } from "Core/device/constants/device-id"
import { DeviceType } from "Core/device"
import { unknownSerialNumber } from "Core/device/constants/unknown-serial-number.constant"

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

export abstract class BaseDevice {
  public id: DeviceId

  protected constructor(
    public portInfo: PortInfo,
    public deviceType: DeviceType
  ) {
    this.id = this.generateDeviceIdBySerialNumber(portInfo.serialNumber)
  }

  public toSerializableObject(): DeviceBaseProperties {
    return {
      ...this.portInfo,
      serialNumber: this.portInfo.serialNumber,
      id: this.id,
      deviceType: this.deviceType,
    }
  }

  abstract connect(): Promise<ResultObject<undefined>>

  abstract request(config: unknown): Promise<unknown>

  private generateDeviceIdBySerialNumber = (
    serialNumber: string = unknownSerialNumber
  ): DeviceId => {
    return serialNumber === unknownSerialNumber ? uniqueId() : serialNumber
  }
}
