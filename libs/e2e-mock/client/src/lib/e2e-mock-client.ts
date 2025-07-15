/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2eMockIpcEvents } from "e2e-mock/models"
import { IpcClient } from "./ipc-client"
import { SetAppUpdaterCheckPayload } from "app-updater/models"

const ipcClient = new IpcClient()

export const E2EMockClient = {
  connect: () => ipcClient.connect(),
  disconnect: () => ipcClient.disconnect(),
  shutdownServer: (): void => {
    ipcClient.emit(E2eMockIpcEvents.shutdownServer)
  },
  setAppUpdaterCheckResult: (payload: SetAppUpdaterCheckPayload): void => {
    ipcClient.emit(E2eMockIpcEvents.setAppUpdaterCheckResult, payload)
  },
}
