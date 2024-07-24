/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { HelpData, HelpEvent } from "help/models"

export const getHelpData = () => {
  return ipcRenderer.callMain(HelpEvent.GetData) as Promise<Required<HelpData>>
}
