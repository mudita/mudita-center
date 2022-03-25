/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import https from "https"
import axios, { AxiosInstance } from "axios"
import logger from "App/main/utils/logger"
import { AnalyticDataTrackerClass } from "App/analytic-data-tracker/services/analytic-data-tracker-class.interface"
import { AnalyticDataTrackerService } from "App/analytic-data-tracker/services/analytic-data-tracker.service"
import { getAppSettingsService } from "App/app-settings/containers/app-settings.container"

class MatomoTrackerPlaceholder implements AnalyticDataTrackerClass {
  track(): Promise<any> {
    return Promise.resolve()
  }
  toggleTracking(): void {
    return
  }
  setVisitorMetadata(): void {
    return
  }
}

export interface AnalyticDataTrackerFactoryOption {
  apiUrl: string
}

export class AnalyticDataTrackerFactory {
  static create({
    apiUrl,
  }: AnalyticDataTrackerFactoryOption): AnalyticDataTrackerClass {
    if (typeof apiUrl !== "string" || apiUrl === "") {
      logger.info(`AnalyticDataTracker apiUrl is required`)
      return new MatomoTrackerPlaceholder()
    }

    const appSettingsService = getAppSettingsService()

    if (appSettingsService === undefined) {
      throw new Error("Initialize `AppSettingsService` before get it")
    }

    const appSettings = appSettingsService.getAppSettings()

    const _id = appSettings.applicationId
    const trackingEnabled = appSettings.appCollectingData

    const axiosInstance: AxiosInstance = axios.create({
      baseURL: `${apiUrl}/analytics-track`,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })

    return new AnalyticDataTrackerService(
      { _id, trackingEnabled },
      axiosInstance
    )
  }
}
