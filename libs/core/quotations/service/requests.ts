/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcQuotationsEvent } from "./controller.constant"
import { QuotationsError } from "./error.constant"

export const getQuotationsSettingsRequest = async (): Promise<
  ResultObject<
    {
      group: string
      interval: number | string
    },
    QuotationsError
  >
> => {
  return ipcRenderer.callMain(IpcQuotationsEvent.GetSettings)
}

export const updateQuotationsSettingsRequest = async (options: {
  group: string
  interval: string | number
}): Promise<ResultObject<true, QuotationsError>> => {
  return ipcRenderer.callMain(IpcQuotationsEvent.UpdateSettings, options)
}
