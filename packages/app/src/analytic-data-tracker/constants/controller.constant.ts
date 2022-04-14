/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "analytic-data-tracker"

export enum IpcAnalyticDataTrackerEvent {
  Track = "track",
  TrackUnique = "track-unique",
  ToggleTracking = "toggle-tracking",
  SetVisitorMetadata = "set-visitor-metadata",
}

export enum IpcAnalyticDataTrackerRequest {
  Track = "analytic-data-tracker-track",
  TrackUnique = "analytic-data-tracker-track-unique",
  ToggleTracking = "analytic-data-tracker-toggle-tracking",
  SetVisitorMetadata = "analytic-data-tracker-set-visitor-metadata",
}
