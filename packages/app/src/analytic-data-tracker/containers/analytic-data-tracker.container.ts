/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AnalyticDataTrackerClass,
  AnalyticDataTrackerFactory,
} from "App/analytic-data-tracker/services"

const apiUrl = String(process.env.ANALYTICS_API_URL)
const siteId = Number(process.env.ANALYTICS_API_SITE_ID)

let analyticDataTracker: AnalyticDataTrackerClass

export const createAnalyticDataTracker = (): AnalyticDataTrackerClass => {
  if (!analyticDataTracker) {
    analyticDataTracker = AnalyticDataTrackerFactory.create({
      apiUrl,
      siteId,
    })
  }

  return analyticDataTracker
}

export const getAnalyticDataTracker = ():
  | AnalyticDataTrackerClass
  | undefined => analyticDataTracker
