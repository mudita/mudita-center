/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { CallRendererEvent } from "./call-renderer.helper"

export const answerMain = <DataType = unknown>(
  event: CallRendererEvent,
  callback: (data: DataType) => void | PromiseLike<void>
) => {
  return ipcRenderer.answerMain(event, callback)
}
