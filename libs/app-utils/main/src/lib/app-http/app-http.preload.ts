/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AppHttpIpcEvents,
  AppHttpRequestConfig,
  AppHttpResult,
} from "app-utils/models"
import { electronAPI } from "@electron-toolkit/preload"
import { AxiosProgressEvent } from "axios"

export const appHttp = {
  request: <Data>(
    config: AppHttpRequestConfig
  ): Promise<AppHttpResult<Data>> => {
    return electronAPI.ipcRenderer.invoke(AppHttpIpcEvents.Request, config)
  },
  abort: (rid: string) => {
    return electronAPI.ipcRenderer.invoke(AppHttpIpcEvents.Abort, rid)
  },
  onDownloadProgress: (
    rid: string,
    callback: (progress: Omit<AxiosProgressEvent, "event">) => void
  ) => {
    electronAPI.ipcRenderer.on(
      AppHttpIpcEvents.OnDownloadProgress,
      (_, args: Omit<AxiosProgressEvent, "event"> & { rid: string }) => {
        if (args.rid === rid) {
          callback(args)
        }
      }
    )
  },
}
