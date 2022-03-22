/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import https from "https"
import axios, { AxiosInstance } from "axios"
import logger from "App/main/utils/logger"
import {
  AnalyticDataTrackerClass,
  trackEvent,
} from "App/analytic-data-tracker/services/analytic-data-tracker-class.interface"
import { AnalyticDataTrackerService } from "App/analytic-data-tracker/services/analytic-data-tracker.service"
import { getAppSettingsService } from "App/app-settings/containers/app-settings.container"

class MatomoTrackerPlaceholder implements AnalyticDataTrackerClass {
  track(): Promise<any> {
    return Promise.resolve()
  }
}

export interface AnalyticDataTrackerFactoryOption {
  siteId: trackEvent["idsite"]
  apiUrl: string
}

export class AnalyticDataTrackerFactory {
  static create({
    siteId,
    apiUrl,
  }: AnalyticDataTrackerFactoryOption): AnalyticDataTrackerClass {
    if (siteId === undefined || isNaN(Number(siteId))) {
      logger.info(`AnalyticDataTracker siteId is required`)
      return new MatomoTrackerPlaceholder()
    }

    if (typeof apiUrl !== "string" || apiUrl === "") {
      logger.info(`AnalyticDataTracker apiUrl is required`)
      return new MatomoTrackerPlaceholder()
    }

    const appSettingsService = getAppSettingsService()

    if (appSettingsService === undefined) {
      throw new Error("Initialize `AppSettingsService` before get it")
    }

    const _id = appSettingsService.getAppSettings().applicationId

    const axiosInstance: AxiosInstance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })

    return new AnalyticDataTrackerService(siteId, apiUrl, _id, axiosInstance)
  }
}
