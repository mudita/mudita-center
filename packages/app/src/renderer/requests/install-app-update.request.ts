/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { AppUpdateAction } from "App/main/autoupdate"

const installAppUpdateRequest = (): Promise<void> =>
  ipcRenderer.callMain(AppUpdateAction.Install)

export default installAppUpdateRequest
