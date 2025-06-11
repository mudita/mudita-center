/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { AnalyticsService } from "./analytics.service"
import { AnalyticsEvent, AnalyticsIpcEvents } from "app-utils/models"

let appActionsService: AnalyticsService

export const initAnalytics = (ipcMain: IpcMain) => {
  if (!appActionsService) {
    appActionsService = new AnalyticsService({ trackingEnabled: false })

    ipcMain.handle(AnalyticsIpcEvents.Track, (_, event: AnalyticsEvent) => {
      void appActionsService.track(event)
    })
  }
}
