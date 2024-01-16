/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { ipcRenderer } from "electron-better-ipc"
import { APIMenuServiceEvents, Outbox } from "device/models"

export const getMenuConfigRequest = (): Promise<ResultObject<Outbox>> => {
  return ipcRenderer.callMain(APIMenuServiceEvents.GetMenuConfig)
}
