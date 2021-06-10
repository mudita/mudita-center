/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { AppUpdateEvent } from "App/main/autoupdate"

const registerErrorAppUpdateListener = (
  listener: (data: unknown) => void
): (() => void) => {
  return ipcRenderer.answerMain(AppUpdateEvent.Error, listener)
}

export default registerErrorAppUpdateListener
