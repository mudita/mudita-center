/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppHttpRequestConfig, AppHttpResult } from "app-utils/models"

export interface MockAppHttpResponsePayload extends AppHttpRequestConfig {
  url: AppHttpRequestConfig["url"]
  method: AppHttpRequestConfig["method"]
  response: AppHttpResult<unknown>
}
