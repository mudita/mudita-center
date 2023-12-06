/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import { Observer } from "Core/core/types"
import { DeviceManager } from "Core/device-manager/services"
import { DeviceServiceEvent } from "Core/device/constants"

export class DeviceDisconnectedObserver implements Observer {
  constructor(
    private deviceManager: DeviceManager,
    private eventEmitter: EventEmitter
  ) {}

  public observe(): void {
    this.eventEmitter.on(
      DeviceServiceEvent.DeviceDisconnected,
      (path: string) => {
        this.deviceManager.removeDevice(path)
      }
    )
  }
}
