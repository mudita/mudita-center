/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import { AppActionsIpcEvents } from "app-utils/models"

export const appActions = {
  close: (): void => {
    void electronAPI.ipcRenderer.invoke(AppActionsIpcEvents.Close)
  },
}
