/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosInstance, AxiosResponse } from "axios"
import {
  AnalyticDataTrackerClass,
  trackEvent,
} from "App/analytic-data-tracker/services/analytic-data-tracker-class.interface"

export interface AnalyticDataTrackerOptions {
  _id: string
  production: boolean
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
  private readonly production: boolean
  private readonly _id: string

  constructor(
    options: AnalyticDataTrackerOptions,
    private httpClient: AxiosInstance
  ) {
    this._id = options._id
    this.production = options.production
    this.trackingEnabled = options.trackingEnabled ?? true
  }

  public track(event: trackEvent): Promise<AxiosResponse | undefined> {
    if (!this.trackingEnabled) {
      return Promise.resolve(undefined)
    }

    return this.httpClient.post("", {
      production: this.production,
      _id: this._id,
      ...this.visitorMetadata,
      ...event,
    })
  }

  public toggleTracking(flag: boolean): void {
    this.trackingEnabled = flag
  }

  public setVisitorMetadata(visitorMetadata: VisitorMetadata): void {
    this.visitorMetadata = visitorMetadata
  }
}
