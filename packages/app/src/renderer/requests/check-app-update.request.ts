/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { AppUpdateAction } from "App/main/autoupdate"

const checkAppUpdateRequest = (): Promise<void> =>
  ipcRenderer.callMain(AppUpdateAction.Check)

export default checkAppUpdateRequest
