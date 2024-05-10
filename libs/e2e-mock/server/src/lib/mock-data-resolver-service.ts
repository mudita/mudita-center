/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IDeviceResolverService } from "Core/device-manager/services"
import { BaseDevice } from "Core/device/modules/base-device"
import { PortInfo } from "serialport"
import { MockDevice } from "./mock-device/mock-device"
import { DeviceType } from "Core/device"

export class MockDeviceResolverService implements IDeviceResolverService {
  public resolve(portInfo: PortInfo): BaseDevice | undefined {
    return new MockDevice(portInfo, DeviceType.APIDevice)
  }
}
