/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import { HelpData } from "./app-help.types"
import { HelpIpcEvents } from "app-utils/models"

export const appHelp = {
  getData: (): Promise<HelpData> => {
    return electronAPI.ipcRenderer.invoke(HelpIpcEvents.GetData)
  },
}
