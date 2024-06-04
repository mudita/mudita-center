/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { mockHttpStateService } from "e2e-mock-server"
import { HttpClientService } from "./http-client.service"
import { BaseHttpClientService } from "./base-http-client.service"
import { MockHttpClientService } from "./mock-http-client.service"

const httpClientService =
  process.env.MOCK_DEVICE_ENABLED === "1"
    ? new MockHttpClientService(mockHttpStateService)
    : new HttpClientService()

export const getHttpClientService = (): BaseHttpClientService =>
  httpClientService
