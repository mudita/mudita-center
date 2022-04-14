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
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { TrackerCacheService } from "App/analytic-data-tracker/services/tracker-cache.service"
import { TrackEvent } from "App/analytic-data-tracker/types/track-event.interface"

class MatomoTrackerPlaceholder implements AnalyticDataTrackerClass {
  track(): Promise<any> {
    return Promise.resolve()
  }
  trackUnique(): Promise<any> {
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
  siteId: TrackEvent["idsite"]
  apiUrl: string
}

export class AnalyticDataTrackerFactory {
  static create(
    fileSystem: FileSystemService,
    { siteId, apiUrl }: AnalyticDataTrackerFactoryOption
  ): AnalyticDataTrackerClass {
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

    const appSettings = appSettingsService.getAppSettings()

    const _id = appSettings.applicationId
    const trackingEnabled = appSettings.appCollectingData

    const axiosInstance: AxiosInstance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })

    const trackerCacheService = new TrackerCacheService(fileSystem)

    return new AnalyticDataTrackerService(
      { _id, siteId, apiUrl, trackingEnabled },
      trackerCacheService,
      axiosInstance
    )
  }
}
