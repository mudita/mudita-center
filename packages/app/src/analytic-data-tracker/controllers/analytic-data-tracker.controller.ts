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
  VisitorMetadata,
} from "App/analytic-data-tracker/services"
import { TrackEvent } from "App/analytic-data-tracker/types"

@Controller(ControllerPrefix)
export class AnalyticDataTrackerController {
  constructor(private tracker: AnalyticDataTrackerClass) {}

  @IpcEvent(IpcAnalyticDataTrackerEvent.Track)
  public async track(event: TrackEvent): Promise<void> {
    await this.tracker.track(event)
  }

  @IpcEvent(IpcAnalyticDataTrackerEvent.TrackUnique)
  public async trackUnique(event: TrackEvent): Promise<void> {
    await this.tracker.trackUnique(event)
  }

  @IpcEvent(IpcAnalyticDataTrackerEvent.ToggleTracking)
  public toggleTracking(flag: boolean): void {
    this.tracker.toggleTracking(flag)
  }

  @IpcEvent(IpcAnalyticDataTrackerEvent.SetVisitorMetadata)
  public setVisitorMetadata(visitorMetadata: VisitorMetadata): void {
    this.tracker.setVisitorMetadata(visitorMetadata)
  }
}
