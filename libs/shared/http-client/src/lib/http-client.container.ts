/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { HttpClientService } from "./http-client.service"
import { BaseHttpClientService } from "./base-http-client.service"

const httpClientService = new HttpClientService()

export const getHttpClientService = (): BaseHttpClientService =>  httpClientService
