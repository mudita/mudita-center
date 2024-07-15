/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosRequestConfig } from "axios"
import { mockHttpStateService, mockServiceEnabled } from "e2e-mock-server"
import { HttpClientService } from "./http-client.service"
import { BaseHttpClientService } from "./base-http-client.service"
import { MockHttpClientService } from "./mock-http-client.service"

export class HttpClient{
  static create (config?: AxiosRequestConfig): BaseHttpClientService {
    return mockServiceEnabled
      ? new MockHttpClientService(mockHttpStateService)
      : new HttpClientService(config)
  }
}
