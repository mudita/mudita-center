/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"
import { IpcEvent } from "Core/core/decorators"
import { IpcDeviceProtocolEvent } from "../constants/controller.constant"
import { DeviceProtocol } from "./device-protocol"

export class DeviceProtocolService {
  constructor(private deviceProtocol: DeviceProtocol) {}

  @IpcEvent(IpcDeviceProtocolEvent.SetActiveDevice)
  public setActiveDevice(id: DeviceId | undefined): ResultObject<boolean> {
    return this.deviceProtocol.setActiveDevice(id)
  }

  @IpcEvent(IpcDeviceProtocolEvent.ConnectDevice)
  public connectDevice(id: DeviceId): Promise<ResultObject<undefined>> {
    return this.deviceProtocol.connectDevice(id)
  }
}
