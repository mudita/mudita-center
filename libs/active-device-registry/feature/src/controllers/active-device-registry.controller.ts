/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { DeviceProtocol } from "device-protocol/feature"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"
import { IpcActiveDeviceRegistryEvent } from "../constants"

export class ActiveDeviceRegistryController {
  constructor(private deviceProtocol: DeviceProtocol) {}

  @IpcEvent(IpcActiveDeviceRegistryEvent.SetActiveDevice)
  public setActiveDevice(id: DeviceId | undefined): ResultObject<boolean> {
    return this.deviceProtocol.setActiveDevice(id)
  }
}
