/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import {
  AnalyticDataTrackerClass,
  trackEvent,
} from "App/analytic-data-tracker/services/analytic-data-tracker-class.interface"

export interface AnalyticDataTrackerOptions {
  _id: string
  siteId: number
  apiUrl: string
  trackingEnabled?: boolean
}

export interface VisitorMetadata {
  ua?: trackEvent["ua"]
  res?: trackEvent["res"]
  lang?: trackEvent["lang"]
}

export class AnalyticDataTrackerService implements AnalyticDataTrackerClass {
  private trackingEnabled: boolean
  private visitorMetadata: VisitorMetadata = {}
  private readonly siteId: number
  private readonly apiUrl: string
  private readonly _id: string

  constructor(
    options: AnalyticDataTrackerOptions,
    private httpClient: AxiosInstance
  ) {
    this._id = options._id
    this.siteId = options.siteId
    this.apiUrl = options.apiUrl
    this.trackingEnabled = options.trackingEnabled ?? true
  }

  public track(event: trackEvent): Promise<AxiosResponse | undefined> {
    if (!this.trackingEnabled) {
      return Promise.resolve(undefined)
    }

    let params: AxiosRequestConfig["params"] = {
      rec: 1,
      apiv: 1,
      idsite: this.siteId,
      _id: this._id,
      ...event,
    }

    if (this.visitorMetadata) {
      params = {
        ...this.visitorMetadata,
        ...params,
      }
    }

    return this.httpClient.post(this.apiUrl, undefined, {
      params,
    })
  }

  public toggleTracking(flag: boolean): void {
    this.trackingEnabled = flag
  }

  public setVisitorMetadata(visitorMetadata: VisitorMetadata): void {
    this.visitorMetadata = visitorMetadata
  }
}
