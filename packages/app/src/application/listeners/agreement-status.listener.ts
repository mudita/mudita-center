/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "App/__deprecated__/common/emitters/ipc-emitter.enum"
import { Event } from "electron"

export const registerAgreementStatusListener = (
  listener: (event: Event, status: boolean) => void
): void => {
  ipcRenderer.on(IpcEmitter.DeviceAgreementStatus, listener)
}

export const removeAgreementStatusListener = (
  listener: (event: Event, status: boolean) => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.DeviceAgreementStatus, listener)
}
