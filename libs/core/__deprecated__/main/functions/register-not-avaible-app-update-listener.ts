/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { AppUpdateEvent } from "Core/__deprecated__/main/autoupdate"

const registerNotAvailableAppUpdateListener = (
  listener: (data: unknown) => void
): (() => void) => {
  return ipcRenderer.answerMain(AppUpdateEvent.NotAvailable, listener)
}

export default registerNotAvailableAppUpdateListener
