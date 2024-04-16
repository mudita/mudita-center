/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum IpcAnalyticDataTrackerEvent {
  Track = "analytic_track",
  TrackUnique = "analytic_track-unique",
  TrackWithoutDeviceCheck = "analytic_track-without-device-check",
  TrackUniqueWithoutDeviceCheck = "analytic_track-unique-without-device-check",
  ToggleTracking = "analytic_toggle-tracking",
  SetExternalUsageDevice = "analytic_set-external-usage-device",
  SetVisitorMetadata = "analytic_set-visitor-metadata",
}
