/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import {
  ControllerPrefix,
  IpcAnalyticDataTrackerEvent,
} from "App/analytic-data-tracker/constants"
import {
  AnalyticDataTrackerClass,
  trackEvent,
} from "App/analytic-data-tracker/services"

@Controller(ControllerPrefix)
export class AnalyticDataTrackerController {
  constructor(private tracker: AnalyticDataTrackerClass) {}

  @IpcEvent(IpcAnalyticDataTrackerEvent.Track)
  public async track(event: trackEvent): Promise<void> {
    await this.tracker.track(event)
  }
}
