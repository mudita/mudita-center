/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { CallRendererEvent } from "App/api-main/call-renderer.helper"
import { ipcRenderer } from "electron-better-ipc"

export const answerMain = (
  event: CallRendererEvent,
  callback: (data: unknown) => void | PromiseLike<void>
) => {
  return ipcRenderer.answerMain(event, callback)
}
