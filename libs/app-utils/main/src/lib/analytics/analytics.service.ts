/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from "axios"
import { AnalyticsEvent } from "app-utils/models"

interface AnalyticDataTrackerOptions {
  trackingEnabled?: boolean
}

export class AnalyticsService {
  private trackingEnabled: boolean

  constructor(options: AnalyticDataTrackerOptions) {
    this.trackingEnabled = options.trackingEnabled ?? true
  }

  public async track(
    event: AnalyticsEvent
  ): Promise<AxiosResponse | undefined> {
    if (!this.trackingEnabled) {
      return
    }
    return this.trackRequest(event)
  }

  private async trackRequest(
    event: AnalyticsEvent
  ): Promise<AxiosResponse | undefined> {
    console.log("AnalyticsService.trackRequest", event)

    return {
      status: 200,
      statusText: "Ok",
      headers: {} as AxiosResponseHeaders,
      config: {} as InternalAxiosRequestConfig,
      data: undefined,
    }
  }
}
