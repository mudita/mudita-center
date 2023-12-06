/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { IpcAnalyticDataTrackerEvent } from "Core/analytic-data-tracker/constants"
import {
  AnalyticDataTrackerClass,
  VisitorMetadata,
} from "Core/analytic-data-tracker/services"
import { TrackEvent } from "Core/analytic-data-tracker/types"

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

  @IpcEvent(IpcAnalyticDataTrackerEvent.TrackWithoutDeviceCheck)
  public async trackWithoutDeviceCheck(event: TrackEvent): Promise<void> {
    await this.tracker.track(event, false)
  }

  @IpcEvent(IpcAnalyticDataTrackerEvent.TrackUniqueWithoutDeviceCheck)
  public async trackUniqueWithoutDeviceCheck(event: TrackEvent): Promise<void> {
    await this.tracker.trackUnique(event, false)
  }

  @IpcEvent(IpcAnalyticDataTrackerEvent.ToggleTracking)
  public toggleTracking(flag: boolean): void {
    this.tracker.toggleTracking(flag)
  }

  @IpcEvent(IpcAnalyticDataTrackerEvent.SetExternalUsageDevice)
  public setExternalUsageDevice(flag: boolean): void {
    this.tracker.setExternalUsageDevice(flag)
  }

  @IpcEvent(IpcAnalyticDataTrackerEvent.SetVisitorMetadata)
  public setVisitorMetadata(visitorMetadata: VisitorMetadata): void {
    this.tracker.setVisitorMetadata(visitorMetadata)
  }
}
