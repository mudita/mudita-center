/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AnalyticDataTrackerClass,
  AnalyticDataTrackerFactory,
} from "App/analytic-data-tracker/services"

const apiUrl = String(process.env.MUDITA_CENTER_SERVER_URL)

let analyticDataTracker: AnalyticDataTrackerClass

export const createFilesManager = () => {
  if (!analyticDataTracker) {
    analyticDataTracker = AnalyticDataTrackerFactory.create({
      apiUrl,
    })
  }

  return analyticDataTracker
}

export const getAnalyticDataTracker = ():
  | AnalyticDataTrackerClass
  | undefined => analyticDataTracker
