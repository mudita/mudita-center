/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import https from "https"
import axios, { AxiosInstance } from "axios"
import logger from "Core/__deprecated__/main/utils/logger"
import { AnalyticDataTrackerClass } from "Core/analytic-data-tracker/services/analytic-data-tracker-class.interface"
import { AnalyticDataTrackerService } from "Core/analytic-data-tracker/services/analytic-data-tracker.service"
import { getSettingsService } from "Core/settings/containers/settings.container"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { TrackerCacheService } from "Core/analytic-data-tracker/services/tracker-cache.service"
import { TrackEvent } from "Core/analytic-data-tracker/types/track-event.interface"

class MatomoTrackerPlaceholder implements AnalyticDataTrackerClass {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  track(): Promise<any> {
    return Promise.resolve()
  }
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trackUnique(): Promise<any> {
    return Promise.resolve()
  }
  toggleTracking(): void {
    return
  }
  setExternalUsageDevice(): void {
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

    const settingsService = getSettingsService()

    if (settingsService === undefined) {
      throw new Error("Initialize `SettingsService` before get it")
    }

    const appSettings = settingsService.getSettings()

    const _id = appSettings.applicationId
    const trackingEnabled =
      appSettings.privacyPolicyAccepted && process.env.ANALYTICS_ENABLED === "1"

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
