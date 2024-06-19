/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios, { AxiosRequestConfig } from "axios"
import { mockHttpStateService, mockServiceEnabled } from "e2e-mock-server"
import { BaseHttpClientService } from "./base-http-client.service"
import { MockHttpClientService } from "./mock-http-client.service"

export class HttpClient {
  static create(config?: AxiosRequestConfig): BaseHttpClientService {
    return mockServiceEnabled
      ? new MockHttpClientService(mockHttpStateService)
      : axios.create(config)
  }
}
