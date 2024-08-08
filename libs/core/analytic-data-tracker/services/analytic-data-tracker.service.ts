/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { AnalyticDataTrackerClass } from "Core/analytic-data-tracker/services/analytic-data-tracker-class.interface"
import { TrackerCacheService } from "Core/analytic-data-tracker/services/tracker-cache.service"
import { TrackEvent } from "Core/analytic-data-tracker/types"

export interface AnalyticDataTrackerOptions {
  _id: string | null
  siteId: number
  apiUrl: string
  trackingEnabled?: boolean
}

export interface VisitorMetadata {
  ua?: TrackEvent["ua"]
  res?: TrackEvent["res"]
  lang?: TrackEvent["lang"]
}

export class AnalyticDataTrackerService implements AnalyticDataTrackerClass {
  private trackingEnabled: boolean
  private externalUsageDevice: boolean
  private visitorMetadata: VisitorMetadata = {}
  private readonly siteId: number
  private readonly apiUrl: string
  private readonly _id: string | null

  constructor(
    options: AnalyticDataTrackerOptions,
    private trackerCacheService: TrackerCacheService,
    private httpClient: AxiosInstance
  ) {
    this._id = options._id
    this.siteId = options.siteId
    this.apiUrl = options.apiUrl
    this.trackingEnabled = options.trackingEnabled ?? true
    this.externalUsageDevice = false
  }
  public async track(
    event: TrackEvent,
    externalUsageDeviceOnly = true
  ): Promise<AxiosResponse | undefined> {
    if (!this.trackingEnabled) {
      return
    }
    if (externalUsageDeviceOnly && !this.externalUsageDevice) {
      return
    }

    return this.trackRequest(event)
  }

  public async trackUnique(
    event: TrackEvent,
    externalUsageDeviceOnly = true
  ): Promise<AxiosResponse | undefined> {
    if (!this.trackingEnabled) {
      return
    }

    if (externalUsageDeviceOnly && !this.externalUsageDevice) {
      return
    }

    if (!(await this.trackerCacheService.isEventUnique(event))) {
      return
    }

    const response = await this.trackRequest(event)

    if (response?.status === 200) {
      await this.trackerCacheService.saveEvent(event)
    }

    return response
  }

  public toggleTracking(flag: boolean): void {
    this.trackingEnabled = flag
  }

  public setExternalUsageDevice(flag: boolean): void {
    this.externalUsageDevice = flag
  }

  public setVisitorMetadata(visitorMetadata: VisitorMetadata): void {
    this.visitorMetadata = visitorMetadata
  }

  private async trackRequest(
    event: TrackEvent
  ): Promise<AxiosResponse | undefined> {
    const params: AxiosRequestConfig["params"] = {
      rec: 1,
      apiv: 1,
      idsite: this.siteId,
      _id: this._id,
      ...this.visitorMetadata,
      ...event,
    }

    try {
      return await this.httpClient.post(this.apiUrl, undefined, {
        params,
        timeout: 3000,
      })
    } catch {
      return undefined
    }
  }
}
