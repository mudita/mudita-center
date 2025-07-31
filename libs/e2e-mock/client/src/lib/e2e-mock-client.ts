/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2eMockIpcEvents } from "e2e-mock/models"
import { SetAppUpdaterPayload } from "app-updater/models"
import { SetUsbAccessPayload } from "app-init/models"
import { IpcClient } from "./ipc-client"
import { MockAppHttpResponsePayload } from "app-utils/models"

const ipcClient = new IpcClient()

export const E2EMockClient = {
  connect: () => ipcClient.connect(),
  disconnect: () => ipcClient.disconnect(),
  shutdownServer: (): void => {
    ipcClient.emit(E2eMockIpcEvents.shutdownServer)
  },
  setAppUpdaterState: (payload: SetAppUpdaterPayload): void => {
    ipcClient.emit(E2eMockIpcEvents.setAppUpdaterState, payload)
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
  mockAppHttpResponse: (payload: MockAppHttpResponsePayload): void => {
    ipcClient.emit(E2eMockIpcEvents.mockAppHttpResponse, payload)
  },
}
