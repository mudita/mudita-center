/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "analytic-data-tracker"

export enum IpcAnalyticDataTrackerEvent {
  Track = "track",
}

export enum IpcAnalyticDataTrackerRequest {
  Track = "analytic-data-tracker-track",
}
