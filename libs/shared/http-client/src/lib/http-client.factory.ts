/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosRequestConfig } from "axios"
import { mockHttpStateService } from "e2e-mock-server"
import { HttpClientService } from "./http-client.service"
import { BaseHttpClientService } from "./base-http-client.service"
import { MockHttpClientService } from "./mock-http-client.service"

export class HttpClient{
  static create (config?: AxiosRequestConfig): BaseHttpClientService {
    return process.env.MOCK_SERVICE_ENABLED === "1"
      ? new MockHttpClientService(mockHttpStateService)
      : new HttpClientService(config)
  }
}
