/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "analytic-data-tracker"

export enum IpcAnalyticDataTrackerEvent {
  Track = "track",
  TrackUnique = "track-unique",
  TrackWithoutDeviceCheck = "track-without-device-check",
  TrackUniqueWithoutDeviceCheck = "track-unique-without-device-check",
  ToggleTracking = "toggle-tracking",
  SetExternalUsageDevice = "set-external-usage-device",
  SetVisitorMetadata = "set-visitor-metadata",
}

export enum IpcAnalyticDataTrackerRequest {
  Track = "analytic-data-tracker-track",
  TrackUnique = "analytic-data-tracker-track-unique",
  TrackWithoutDeviceCheck = "analytic-data-tracker-track-without-device-check",
  TrackUniqueWithoutDeviceCheck = "analytic-data-tracker-track-unique-without-device-check",
  ToggleTracking = "analytic-data-tracker-toggle-tracking",
  SetExternalUsageDevice = "analytic-data-tracker-set-external-usage-device",
  SetVisitorMetadata = "analytic-data-tracker-set-visitor-metadata",
}
