/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcSynchronizeTimeEvent } from "../constants/controller.constant"
import { TimeSynchronizationError } from "../constants/error.constant"

export const getTimeRequest = async (): Promise<
  ResultObject<number, TimeSynchronizationError>
> => {
  return ipcRenderer.callMain(IpcSynchronizeTimeEvent.GetTime)
}
