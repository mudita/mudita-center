/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"
import { DeviceId } from "Core/device/constants/device-id"
import { DeviceType } from "Core/device"

export abstract class BaseDevice implements DeviceBaseProperties {
  protected constructor(
    public id: DeviceId,
    public path: string,
    public serialNumber: string | undefined,
    public deviceType: DeviceType
  ) {}

  public toSerializableObject(): DeviceBaseProperties {
    return {
      id: this.id,
      path: this.path,
      serialNumber: this.serialNumber,
      deviceType: this.deviceType,
    }
  }
  abstract connect(): Promise<ResultObject<undefined>>

  abstract request(config: unknown): Promise<unknown>
}
