/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "device-protocol/models"
import { IDeviceResolverService } from "device-protocol/feature"
import { BaseDevice } from "Core/device/modules/base-device"
import { PortInfo } from "serialport"
import { MockDevice } from "./mock-device/mock-device"

export class MockDeviceResolverService implements IDeviceResolverService {
  public resolve(portInfo: PortInfo): BaseDevice | undefined {
    return new MockDevice(portInfo, DeviceType.APIDevice)
  }
}
