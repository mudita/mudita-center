/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AppHttpIpcEvents,
  AppHttpRequestConfig,
  AppHttpResponse,
} from "app-utils/models"
import { electronAPI } from "@electron-toolkit/preload"

export const appHttp = {
  request: <T>(
    config: AppHttpRequestConfig
  ): Promise<AppHttpResponse<T> | Error> => {
    console.log(config)
    return electronAPI.ipcRenderer.invoke(AppHttpIpcEvents.Request, config)
  },
}
