/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TimeSynchronizationService } from "../services/time-synchronization.service"
import { IpcEvent } from "Core/core/decorators"
import { IpcSynchronizeTimeEvent } from "Core/time-synchronization/constants/controller.constant"

export class TimeSynchronizationController {
  constructor(private timeSynchronizationService: TimeSynchronizationService) {}

  @IpcEvent(IpcSynchronizeTimeEvent.SynchronizeTime)
  async synchronizeTime() {
    return this.timeSynchronizationService.synchronizeTime()
  }

  @IpcEvent(IpcSynchronizeTimeEvent.GetTime)
  async getTime() {
    return this.timeSynchronizationService.getTime()
  }
}
