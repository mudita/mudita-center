/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { DeviceProtocolService } from "device-protocol/feature"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"
import { IpcDeviceManagerEvent } from "../constants"

export class DeviceManagerController {
  constructor(private deviceProtocolService: DeviceProtocolService) {}

  @IpcEvent(IpcDeviceManagerEvent.ConnectDevice)
  public connectDevice(id: DeviceId): Promise<ResultObject<undefined>> {
    return this.deviceProtocolService.connectDevice(id)
  }
}
