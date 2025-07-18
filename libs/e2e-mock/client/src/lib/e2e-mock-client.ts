/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2eMockIpcEvents } from "e2e-mock/models"
import { SetAppUpdaterCheckPayload } from "app-updater/models"
import { SetUsbAccessPayload } from "app-init/models"
import { IpcClient } from "./ipc-client"
import {
  AppFileSystemScopeOptions,
  AppFileSystemWriteOptions,
  AppResult,
} from "app-utils/models"

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
  emitAppUpdaterDownloadProgressEvent: (payload: number): void => {
    ipcClient.emit(
      E2eMockIpcEvents.emitAppUpdaterDownloadProgressEvent,
      payload
    )
  },
  setUsbAccess: (payload: SetUsbAccessPayload): void => {
    ipcClient.emit(E2eMockIpcEvents.setUsbAccess, payload)
  },
  write: (options: AppFileSystemWriteOptions): void => {
    ipcClient.emit(E2eMockIpcEvents.write, options)
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  read: (options: AppFileSystemScopeOptions): Promise<AppResult<any>> => {
    return ipcClient.emitWithResponse(E2eMockIpcEvents.read, options)
  },
}
