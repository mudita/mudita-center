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

export const track = async (event: AnalyticsEvent): Promise<AxiosResponse> => {
  console.log("AnalyticsService.trackRequest", event)

  return {
    status: 200,
    statusText: "Ok",
    headers: {} as AxiosResponseHeaders,
    config: {} as InternalAxiosRequestConfig,
    data: undefined,
  }
}
