/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { DeviceProtocolService } from "device-protocol/feature"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"
import { IpcActiveDeviceRegistryEvent } from "../constants"

export class ActiveDeviceRegistryController {
  constructor(private deviceProtocolService: DeviceProtocolService) {}

  @IpcEvent(IpcActiveDeviceRegistryEvent.SetActiveDevice)
  public setActiveDevice(id: DeviceId | undefined): ResultObject<boolean> {
    return this.deviceProtocolService.setActiveDevice(id)
  }
}
