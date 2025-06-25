/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import logger from "electron-log/renderer"
import {
  AnalyticsEvent,
  AppHttpRequestConfig,
  AppHttpResponse,
} from "app-utils/models"
import { AppSettings } from "app-settings/renderer"
import { analyticsConfig } from "./analytics-config"
import { AnalyticsCacheService } from "./analytics-cache.service"
import { AppHttp } from "../app-http"

const analyticsCacheService = new AnalyticsCacheService()

let cachedPrivacyPolicyAccepted: boolean
let cachedAnalyticsId: string

const defaultMetadata: Partial<AnalyticsEvent> = {
  rec: 1,
  apiv: 1,
  idsite: analyticsConfig.siteId,
  ua: window.navigator.userAgent,
  lang: window.navigator.language,
  res: `${window.screen.width * window.devicePixelRatio}x${
    window.screen.height * window.devicePixelRatio
  }`,
}

const trackRequest = async (
  params: AppHttpRequestConfig["params"]
): Promise<AppHttpResponse | Error> => {
  return AppHttp.request({
    method: "post",
    url: analyticsConfig.apiUrl,
    params,
    timeout: 3000,
  })
}

const getPrivacyPolicyAccepted = async (): Promise<boolean> => {
  if (!cachedPrivacyPolicyAccepted) {
    cachedPrivacyPolicyAccepted = await AppSettings.get(
      "user.privacyPolicyAccepted"
    )
  }
  return cachedPrivacyPolicyAccepted
}

const getAnalyticsId = async (): Promise<string> => {
  if (cachedAnalyticsId === undefined) {
    const analyticsId = await AppSettings.get("system.analyticsId")

    if (analyticsId === null || analyticsId === undefined) {
      throw new Error("Analytics ID is not set in AppSettings")
    }

    cachedAnalyticsId = analyticsId
  }
  return cachedAnalyticsId
}

const validate = async (): Promise<boolean> => {
  if (!analyticsConfig.enabled) {
    logger.warn("Analytics tracking is disabled")
    return false
  }

  if (isNaN(analyticsConfig.siteId)) {
    logger.warn("Analytics site ID is not set")
    return false
  }

  if (!analyticsConfig.apiUrl) {
    logger.warn("Analytics API URL is not set")
    return false
  }

  const privacyPolicyAccepted = await getPrivacyPolicyAccepted()

  if (!privacyPolicyAccepted) {
    logger.warn("Privacy policy not accepted")
    return false
  }

  return true
}

const mergeDefaultMetadataWithEvent = async (
  event: AnalyticsEvent
): Promise<AnalyticsEvent> => {
  const _id = await getAnalyticsId()

  return { ...defaultMetadata, _id, ...event }
}

export const track = async (event: AnalyticsEvent): Promise<void> => {
  const valid = await validate()
  if (!valid) {
    return
  }

  const eventWithMetadata = await mergeDefaultMetadataWithEvent(event)
  const response = await trackRequest(eventWithMetadata)

  if (response instanceof Error) {
    logger.warn("Error tracking event:", response)
  } else {
    await analyticsCacheService.saveEvent(event)
  }
}

export const uniqueTrack = async (event: AnalyticsEvent): Promise<void> => {
  const valid = await validate()
  if (!valid) {
    return
  }

  const isUnique = await analyticsCacheService.isEventUnique(event)

  if (!isUnique) {
    return
  }

  const eventWithMetadata = await mergeDefaultMetadataWithEvent(event)
  const response = await trackRequest(eventWithMetadata)

  if (response instanceof Error) {
    logger.warn("Error tracking unique event:", response)
  } else {
    await analyticsCacheService.saveEvent(event)
  }
}
