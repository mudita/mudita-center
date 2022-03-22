/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import https from "https"
import axios, { AxiosInstance } from "axios"
import logger from "App/main/utils/logger"
import { AnalyticDataTrackerClass } from "App/analytic-data-tracker/services/analytic-data-tracker-class.interface"
import { AnalyticDataTrackerService } from "App/analytic-data-tracker/services/analytic-data-tracker.service"

class MatomoTrackerPlaceholder implements AnalyticDataTrackerClass {
  track(): Promise<any> {
    return Promise.resolve()
  }
}

export interface AnalyticDataTrackerFactoryOption {
  siteId: number
  apiUrl: string
}

export class AnalyticDataTrackerFactory {
  static create({
    siteId,
    apiUrl,
  }: AnalyticDataTrackerFactoryOption): AnalyticDataTrackerClass {
    if (isNaN(Number(siteId))) {
      logger.info(`AnalyticDataTracker siteId is required`)
      return new MatomoTrackerPlaceholder()
    }

    if (typeof apiUrl !== "string" || apiUrl === "") {
      logger.info(`AnalyticDataTracker apiUrl is required`)
      return new MatomoTrackerPlaceholder()
    }

    const axiosInstance: AxiosInstance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })

    return new AnalyticDataTrackerService(siteId, apiUrl, axiosInstance)
  }
}
