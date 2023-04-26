/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { AnalyticDataTrackerClass } from "App/analytic-data-tracker/services/analytic-data-tracker-class.interface"
import { TrackerCacheService } from "App/analytic-data-tracker/services/tracker-cache.service"
import { TrackEvent } from "App/analytic-data-tracker/types"

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
  }
  public async track(event: TrackEvent): Promise<AxiosResponse | undefined> {
    if (!this.trackingEnabled) {
      return
    }

    return this.trackRequest(event)
  }

  public async trackUnique(
    event: TrackEvent
  ): Promise<AxiosResponse | undefined> {
    if (!this.trackingEnabled) {
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

  public setVisitorMetadata(visitorMetadata: VisitorMetadata): void {
    this.visitorMetadata = visitorMetadata
  }

  private trackRequest(event: TrackEvent): Promise<AxiosResponse | undefined> {
    const params: AxiosRequestConfig["params"] = {
      rec: 1,
      apiv: 1,
      idsite: this.siteId,
      _id: this._id,
      ...this.visitorMetadata,
      ...event,
    }

    return this.httpClient.post(this.apiUrl, undefined, {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      params,
    })
  }
}
