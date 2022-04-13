/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosResponse } from "axios"
import { VisitorMetadata } from "App/analytic-data-tracker/services/analytic-data-tracker.service"
import { TrackEvent } from "App/analytic-data-tracker/types"

export interface AnalyticDataTrackerClass {
  track(event: TrackEvent): Promise<AxiosResponse | undefined>
  trackUnique(event: TrackEvent): Promise<AxiosResponse | undefined>
  toggleTracking(flag: boolean): void
  setVisitorMetadata(visitorMetadata: VisitorMetadata): void
}
