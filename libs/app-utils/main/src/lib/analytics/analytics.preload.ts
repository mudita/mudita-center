/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosResponse } from "axios"
import { electronAPI } from "@electron-toolkit/preload"
import { AnalyticsEvent, AnalyticsIpcEvents } from "app-utils/models"

export const analytics = {
  track: (event: AnalyticsEvent): Promise<AxiosResponse | undefined> => {
    return electronAPI.ipcRenderer.invoke(AnalyticsIpcEvents.Track, event)
  },
}
