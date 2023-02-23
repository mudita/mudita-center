/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import { Observer } from "App/core/types"
import { DeviceManager } from "App/device-manager/services"
import { DeviceServiceEvent } from "App/device/constants"

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
