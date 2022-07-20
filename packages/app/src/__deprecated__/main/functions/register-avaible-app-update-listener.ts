/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { AppUpdateEvent } from "App/__deprecated__/main/autoupdate"

const registerAvailableAppUpdateListener = (
  listener: (data: unknown) => void
): (() => void) => {
  return ipcRenderer.answerMain(AppUpdateEvent.Available, listener)
}

export default registerAvailableAppUpdateListener
