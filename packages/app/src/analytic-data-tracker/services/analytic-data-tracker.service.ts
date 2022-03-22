/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import {
  AnalyticDataTrackerClass,
  trackEvent,
} from "App/analytic-data-tracker/services/analytic-data-tracker-class.interface"

export class AnalyticDataTrackerService implements AnalyticDataTrackerClass {
  constructor(
    private siteId: number,
    private apiUrl: string,
    private _id: string,
    private httpClient: AxiosInstance
  ) {}

  public track(event: trackEvent): Promise<AxiosResponse> {
    const params: AxiosRequestConfig["params"] = {
      rec: 1,
      apiv: 1,
      idsite: this.siteId,
      _id: this._id,
      ...event,
    }

    return this.httpClient.post(this.apiUrl, undefined, {
      params,
    })
  }
}
